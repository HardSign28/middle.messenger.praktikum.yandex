import Block from '@/core/block';
import { Dialog } from '@/components';
import InputField from '@/components/input/inputField';
import { validateField } from '@/utils/validateField';
import { InputFieldProps } from '@/types/inputField';
import { DefaultProps } from '@/types/props';
import { DialogPasswordProps } from '@/types/dialog';
import { connect } from '@/utils/connect';

class DialogBody extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,

			formState: {
				oldPassword: '',
				newPassword: '',
			},
			userName: props.userName || '',
			InputOldPassword: new InputField({
				label: 'Старый пароль',
				class: 'mb-20',
				type: 'password',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'password');
					(this.children.InputOldPassword as Block<InputFieldProps>).setProps({ error });
					this.setProps({
						formState: {
							...this.props.formState ?? {},
							oldPassword: value,
						},
					});
				},
			}),
			InputNewPassword: new InputField({
				label: 'Новый пароль',
				class: 'mb-20',
				type: 'password',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'password');
					(this.children.InputNewPassword as Block<InputFieldProps>).setProps({ error });
					this.setProps({
						formState: {
							...this.props.formState ?? {},
							newPassword: value,
						},
					});
				},
			}),
		});
	}

	render(): string {
		return `
			{{{ InputOldPassword }}}
			{{{ InputNewPassword }}}
			{{#if changePasswordError }}
				<p>{{changePasswordError}}</p>
			{{/if}}
		`;
	}
}

const mapStateToPropsForBody = (state: AppState) => ({
	changePasswordError: state.changePasswordError,
});

export const ConnectedDialogBody = connect(mapStateToPropsForBody)(DialogBody);

class DialogPassword extends Block {
	constructor(props: DialogPasswordProps) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Сменить пароль',
				labelOk: 'Сменить',
				labelCancel: 'Отмена',
				onOk: () => {
					const formData = this.getFormData();
					props.onOk(formData);
				},
				onCancel: props.onCancel,
				Body: new ConnectedDialogBody(props),
			}),
		});
	}

	getFormData() {
		const { formState } = (this.children.Dialog.children.Body as Block).props;
		return {
			oldPassword: formState?.oldPassword,
			newPassword: formState?.newPassword,
		};
	}

	public render(): string {
		return `
			{{{ Dialog }}}
    	`;
	}
}

const mapStateToProps = (state: AppState) => ({
	isLoading: state.isLoading,
	changePasswordError: state.changePasswordError,
	userName: state.user?.name,
});

export default connect(mapStateToProps)(DialogPassword);
