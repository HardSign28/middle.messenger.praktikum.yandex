import Block from '@/core/block';
import { InputFieldProps } from '@/types/inputField';
import Input from './input';

export default class InputField extends Block {
	constructor(props: InputFieldProps) {
		super('div', {
			...props,
			events: {
				click: (e: MouseEvent) => {
					const { classList } = e.target as HTMLInputElement;
					if (classList.contains('icon-edit')) {
						this.setProps({
							readonly: false,
						});
						(this.children.Input as Block<InputFieldProps>).setProps({
							readonly: false,
						});
						setTimeout(() => {
							const inputElement = (this.children.Input as Block<InputFieldProps>)
								.element as HTMLInputElement;
							if (inputElement) {
								inputElement.focus();

								const supportedTypes = ['text', 'search', 'password', 'tel', 'url'];
								if (supportedTypes.includes(inputElement.type)) {
									const { length } = inputElement.value;
									inputElement.setSelectionRange(length, length);
								}
							}
						}, 0);
					}
				},
			},
			Input: new Input({
				...props,
				className: 'float-input__element',
				events: {
					blur: props.onChange,
				},
			}),
		});
	}

	getClassName(): string {
		return [
			'float-input',
			this.props.class,
			this.props.readonly ? 'float-input_readonly' : '',
			this.props.error ? 'float-input_error' : '',
		]
			.filter(Boolean)
			.join(' ');
	}

	public render(): string {
		if (this.element) {
			this.element.className = this.getClassName();
		}
		return `
        {{{ Input }}}
        <label class="float-input__label" for="{{ id }}">{{ label }}</label>
        {{#if readonly }}
        <div class="icon-edit"></div>
        {{/if}}
        <div class="float-input__error">{{ error }}</div>
    `;
	}
}
