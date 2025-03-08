import Block from '@/core/block';

type InputProps = {
	name?: string;
	label?: string;
	className?: string,
	onChange?: (e: InputEvent) => void;
	onBlur?: (e: InputEvent) => void;
	events?: object,
	type?: string;
	id?: string;
	readonly?: boolean;
	value?: string;
    placeholder?: string;
};

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
