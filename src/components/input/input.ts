import Block from '@/core/block';

type InputProps = {
	label?: string;
	className?: string,
	onChange?: () => void;
	onBlur?: () => void;
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
			...(props.readonly ? { readonly: true } : {}),
			...(props.value ? { value: props.value } : {}),
		};
	}

	public componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
		if (oldProps.readonly !== newProps.readonly) {
			this.element.toggleAttribute('readonly', newProps.readonly);
		}
		return true;
	}
}
