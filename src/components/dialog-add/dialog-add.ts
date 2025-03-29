import Block from '@/core/block';
import { Dialog } from '@/components';
import InputField from '@/components/input/inputField';
import { validateField } from '@/utils/validateField';
import { DefaultProps } from '@/types/props';
import { DialogAddProps } from '@/types/dialog';

interface FormState {
	login: string;
}
class DialogBody extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,

			formState: {
				login: '',
			},
			InputLogin: new InputField({
				label: 'Логин',
				class: 'mb-20',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'login');
					(this.children.InputLogin as Block).setProps({ error });
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
				onOk: () => {
					const formData = this.getFormData();
					props.onOk(formData);
				},
				onCancel: props.onCancel,
				Body: new DialogBody(props),
			}),
		});
	}

	getFormData() {
		const dialog = this.children.Dialog;

		if (Array.isArray(dialog)) {
			throw new Error('Unexpected structure: Dialog is an array');
		}

		const { formState } = (dialog.children.Body as Block).props;
		return {
			login: (formState as FormState).login,
		};
	}

	public render(): string {
		return `
			{{{ Dialog }}}
    	`;
	}
}
