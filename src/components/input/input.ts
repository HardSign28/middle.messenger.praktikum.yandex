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
};

export default class Input extends Block {
	constructor(props: InputProps) {
		super('input', {
			...props,
			events: {
				input: props.onChange,
			},
			attrs: {
				placeholder: props.placeholder || '',
				...(props.id ? { id: props.id } : {}),
				...(props.type ? { type: props.type } : {}),
				...(props.readonly ? { readonly: props.readonly } : {}),
				...(props.value ? { value: props.value } : {}),
			},
		});
	}
}
