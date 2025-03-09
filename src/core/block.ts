import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { DefaultProps } from '@/types/props';
import EventBus from './eventBus';

// Нельзя создавать экземпляр данного класса
export default class Block<P extends DefaultProps = DefaultProps> {
	// eslint-disable-next-line no-use-before-define
	children: Record<string, Block<DefaultProps> | Block<DefaultProps>[]> = {};

	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	private eventBus: () => EventBus<string>;

	props: P;

	_element!: HTMLElement;

	_meta: { tagName: string; props: Record<string, unknown> } | null = null;

	_id = nanoid(6);

	public get id() {
		return this._id;
	}

	/** JSDoc
	 * @param {string} tagName
	 * @param propsWithChildren
	 *
	 * @returns {void}
	 */
	constructor(tagName = 'div', propsWithChildren: Record<string, unknown> = {}) {
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;

		const { props, children } = this._getChildrenAndProps(propsWithChildren);

		this.children = children as Record<string, Block<DefaultProps> | Block<DefaultProps>[]>;

		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props as P);

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus: EventBus<string>) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		if (!this._meta) {
			throw new Error('Meta is not initialized');
		}
		const { tagName, props } = this._meta;
		this._element = this._createDocumentElement(tagName);
		if (typeof props.className === 'string') {
			const classes = props.className.split(' ');
			this._element.classList.add(...classes);
		}

		if (typeof props.attrs === 'object') {
			Object.entries(props.attrs ?? {}).forEach(([attrName, attrValue]) => {
				this._element.setAttribute(attrName, attrValue);
			});
		}
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_getChildrenAndProps(propsAndChildren: Record<string, unknown>) {
		const children: Record<string, Block | Block[]> = {};
		const props: Record<string, unknown> = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((obj) => {
					if (obj instanceof Block) {
						children[key] = value;
					} else {
						props[key] = value;
					}
				});

				return;
			}
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	_componentDidMount() {
		this.componentDidMount();
	}

	componentDidMount() {}

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidUpdate(oldProps: P, newProps: P) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	componentDidUpdate(oldProps: P, newProps: P) {
		// eslint-disable-next-line no-void
		void oldProps;
		// eslint-disable-next-line no-void
		void newProps;
		return true;
	}

	setProps = (nextProps: P) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element(): HTMLElement | null {
		return this._element;
	}

	_addEvents() {
		const { events = {} } = this.props as { events?: Record<string, EventListener> };

		Object.keys(events).forEach((eventName) => {
			this._element.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents() {
		const { events = {} } = this.props as { events?: Record<string, EventListener> };

		Object.keys(events).forEach((eventName) => {
			this._element.removeEventListener(eventName, events[eventName]);
		});
	}

	_compile() {
		const propsAndStubs = { ...this.props };

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				(propsAndStubs as Record<string, unknown>)[key] = child.map(
					(component) => `<div data-id="${component._id}"></div>`,
				);
			} else {
				(propsAndStubs as Record<string, unknown>)[key] = `<div data-id="${child._id}"></div>`;
			}
		});

		const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
		const template = Handlebars.compile(this.render());
		fragment.innerHTML = template(propsAndStubs);

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((component) => {
					const stub = fragment.content.querySelector(
						`[data-id="${component._id}"]`,
					);

					stub?.replaceWith(component.getContent() as Node);
				});
			} else {
				const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

				if (stub && child.getContent()) {
					stub?.replaceWith(child.getContent() as Node);
				}
			}
		});

		return fragment.content;
	}

	_render() {
		this._removeEvents();
		const block = this._compile();

		if (this._element.children.length === 0) {
			this._element.appendChild(block);
		} else {
			this._element.replaceChildren(block);
		}

		this._addEvents();
	}

	render() {
		return '';
	}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: P) {
		const eventBus = this.eventBus();
		const emitBind = eventBus.emit.bind(eventBus);

		return new Proxy(props as P, {
			get(target, prop: string | symbol, receiver) {
				const value = target[prop as keyof P]; // Приведение prop к keyof P
				return typeof value === 'function' ? value.bind(receiver) : value;
			},
			set(target, prop: string | symbol, value) {
				const oldTarget = { ...target };
				target[prop as keyof P] = value; // Приведение prop к keyof P

				emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	_createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show() {
		const element = this.getContent();
		if (element) {
			element.style.display = 'block';
		}
	}

	hide() {
		const element = this.getContent();
		if (element) {
			element.style.display = 'none';
		}
	}
}
