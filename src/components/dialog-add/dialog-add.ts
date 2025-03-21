import Block from '@/core/block';
import { Dialog } from '@/components';
import InputField from '@/components/input/inputField';
import { validateField } from '@/utils/validateField';
import { InputFieldProps } from '@/types/inputField';
import { DefaultProps } from '@/types/props';
import { DialogAddProps } from '@/types/dialog';

class DialogBody extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,

			formState: {
				login: '',
			},
			userName: props.userName || '',
			InputLogin: new InputField({
				label: 'Логин',
				class: 'mb-20',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'login');
					(this.children.InputLogin as Block<InputFieldProps>).setProps({ error });
					this.setProps({
						formState: {
							...this.props.formState ?? {},
							login: value,
						},
					});
				},
			}),
		});
	}

	render(): string {
		return '{{{ InputLogin }}}';
	}
}

export default class DialogAdd extends Block {
	constructor(props: DialogAddProps) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Добавить пользователя',
				labelOk: 'Добавить',
				labelCancel: 'Отмена',
				onOk: props.onOk,
				onCancel: props.onCancel,
				Body: new DialogBody(props),
			}),
		});
	}

	public render(): string {
		return `
			{{{ Dialog }}}
    	`;
	}
}
