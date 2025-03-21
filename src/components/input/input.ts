import Block from '@/core/block';
import { InputProps } from '@/types/input';

export default class Input extends Block {
	constructor(props: InputProps) {
		super('input', {
			...props,

			attrs: Input.getAttributes(props),
		});
	}

	static getAttributes(props: InputProps) {
		return {
			placeholder: props.placeholder || '',
			...(props.id ? { id: props.id } : {}),
			...(props.type ? { type: props.type } : {}),
			...(props.name ? { name: props.name } : {}),
			...(props.readonly ? { readonly: true } : {}),
			...(props.value ? { value: props.value } : {}),
		};
	}

	public componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
		const element = this.element as HTMLElement | null;
		if (element && oldProps.readonly !== newProps.readonly) {
			element.toggleAttribute('readonly', newProps.readonly ?? false);
		}
		return true;
	}
}
