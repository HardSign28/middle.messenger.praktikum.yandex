import Handlebars, { HelperOptions } from 'handlebars';
import Block from './block';

interface PropsBlock {
	[key: string]: never;
}

interface BlockConstructable<P = PropsBlock> {
  new (props: P): Block;
}

export default function registerComponent<Props extends PropsBlock>(
	Component: BlockConstructable<Props>,
) {
	Handlebars.registerHelper(
		Component.name,
		function (
			this: Props,
			{ hash: { ref, ...hash }, data, fn }: HelperOptions,
		) {
			if (!data.root.children) {
				data.root.children = {};
			}

			if (!data.root.refs) {
				data.root.refs = {};
			}

			const { children, refs } = data.root;

			/**
		   * Костыль для того, чтобы передавать переменные
		   * внутрь блоков вручную подменяя значение
		   */
			Object.keys(hash).forEach((key) => {
				const keyString = String(key) as keyof Props;
				if (this[keyString] && typeof this[keyString] === 'string') {
					hash[keyString] = hash[keyString].replace(
						new RegExp(`{{${keyString}}}`, 'i'),
						this[keyString],
					);
				}
			});

			const component = new Component(hash);

			children[component.id] = component;

			if (ref) {
				refs[ref] = component.getContent();
			}

			const contents = fn ? fn(this) : '';

			return `<div data-id="${component.id}">${contents}</div>`;
		},
	);
}
