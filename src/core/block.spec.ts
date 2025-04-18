import sinon from 'sinon';
import { expect } from 'chai';
import Block from '@/core/block';

describe('Block', () => {
	let PageComponent;

	before(() => {
		class Page extends Block {
			constructor(props) {
				super('div', props);
			}

			render() {
				return `
					<div>
						<span id="test-text">{{text}}</span>
						<button>{{text-button}}</button>
					</div>
				`;
			}
		}

		PageComponent = Page;
	});

	afterEach(() => {
		sinon.restore();
		document.body.innerHTML = '';
	});

	// написать тест на то что комопнент создается с переданными пропсами
	it('Должен создать компонент с состоянием из конструктора', () => {
		const text = 'Hello';

		const pageComponent = new PageComponent({ text });

		const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

		expect(spanText).to.be.eq(text);
	});
	// проверить что реактивность у копонента работает
	it('Компонент должен иметь реактивное повдение', () => {
		const newValue = 'New value';

		const pageComponent = new PageComponent({ text: 'Hello' });

		pageComponent.setProps({ text: newValue });
		const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

		expect(spanText).to.be.eq(newValue);
	});
	// проверить что комопнент навешивает события
	it('Компонент должен установить события на элемент', () => {
		const clickhadnlerStub = sinon.stub();
		const pageComponent = new PageComponent({
			events: {
				click: clickhadnlerStub,
			},
		});

		const event = new MouseEvent('click');
		pageComponent.element?.dispatchEvent(event);

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(clickhadnlerStub.calledOnce).to.be.true;
	});

	// проверить что dispatchComponentDidMount отрабатывает когда элемент попал в дом
	it('Компонент должен вызвать dispatchComponentDidMount метод', () => {
		const clock = sinon.useFakeTimers();
		const pageComponent = new PageComponent();

		const spyCDM = sinon.spy(pageComponent, 'componentDidMount');

		pageComponent.getContent();
		clock.next();

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(spyCDM.calledOnce).to.be.true;
	});
});
