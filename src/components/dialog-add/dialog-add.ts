import Block from '@/core/block';
import { Dialog } from '@/components';
import InputField from '@/components/input/inputField';
import { validateField } from '@/utils/validateField';

class DialogBody extends Block {
	constructor(props) {
		super('div', {
			...props,
			userName: props.userName || '',
			InputLogin: new InputField({
				label: 'Логин',
				class: 'mb-20',
				onChange: (e) => {
					const { value } = e.target;
					const error = validateField(value, 'login');
					this.children.InputLogin.setProps({ error });
					this.setProps({
						formState: {
							...this.props.formState,
							login: value || '',
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
	constructor(props) {
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
