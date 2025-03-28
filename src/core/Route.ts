import Block from '@/core/block';
import { RouteInterface } from './Router';

class Route implements RouteInterface {
	private _pathname: string;

	private _blockClass: typeof Block;

	private _block: Block | null;

	private _props: { rootQuery: string };

	constructor(pathname: string, view: typeof Block, props: { rootQuery: string }) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			// this._block.hide();
		}
	}

	match(pathname: string) {
		return pathname === this._pathname;
	}

	_renderDom(query: string, block: Block) {
		const root = document.querySelector(query);

		if (root) {
			root.innerHTML = '';
			const content = block.getContent();

			if (content instanceof Node) {
				root.append(content); // Безопасное добавление контента
			} else {
				throw new Error('Invalid content type returned by block.getContent()');
			}
		} else {
			throw new Error(`Element not found for query: ${query}`);
		}
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass();
		}

		// this._block.show();
		this._renderDom(this._props.rootQuery, this._block);
		this._block.componentDidMount();
	}
}

export default Route;
