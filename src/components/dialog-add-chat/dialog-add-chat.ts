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
				title: '',
			},
			userName: props.userName || '',
			InputTitle: new InputField({
				label: 'Название чата',
				class: 'mb-20',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'message');
					(this.children.InputTitle as Block<InputFieldProps>).setProps({ error });
					this.setProps({
						formState: {
							...this.props.formState ?? {},
							title: value,
						},
					});
				},
			}),
		});
	}

	render(): string {
		return '{{{ InputTitle }}}';
	}
}

export default class DialogAddChat extends Block {
	constructor(props: DialogAddProps) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Добавить чат',
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
		const { formState } = (this.children.Dialog.children.Body as Block).props;
		return {
			title: formState?.title,
		};
	}

	public render(): string {
		return `
			{{{ Dialog }}}
    	`;
	}
}
