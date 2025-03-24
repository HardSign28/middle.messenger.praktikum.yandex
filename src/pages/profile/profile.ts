import {
	Button,
	BackButton,
	Avatar,
	DialogUpload,
	DialogPassword,
} from '@/components';
import Block from '@/core/block';
import InputField from '@/components/input/inputField';
import { validateField } from '@/utils/validateField';
import { DefaultProps } from '@/types/props';
import { connect } from '@/utils/connect';
import * as authServices from '@/services/auth';
import * as usersServices from '@/services/users';

class ProfilePage extends Block {
	constructor(props: DefaultProps) {
		super('main', {
			...props,
			formState: {},
			className: 'page page-profile',
			showDialog: null,
			Avatar: new Avatar({
				size: 'md',
				class: 'mb-20',
				edit: true,
				onClick: () => {
					this.setProps({ showDialog: 'upload' });
				},
			}),
			InputFirstName: new InputField({
				id: 'first-name',
				label: 'Имя',
				class: 'mb-10',
				name: 'first_name',
				readonly: true,

				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'firstName');
					(this.children.InputFirstName as Block).setProps({ error });

					this.setProps({
						formState: {
							...(this.props.formState ?? {}),
							first_name: value,
						},
					});
				},
			}),
			InputSecondName: new InputField({
				id: 'second-name',
				label: 'Фамилия',
				class: 'mb-10',
				name: 'second_name',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'secondName');
					(this.children.InputSecondName as Block).setProps({
						error,
					});

					this.setProps({
						formState: {
							...(this.props.formState ?? {}),
							second_name: value,
						},
					});
				},
			}),
			InputLogin: new InputField({
				id: 'login',
				label: 'Логин',
				class: 'mb-10',
				name: 'login',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'login');
					(this.children.InputLogin as Block).setProps({ error });

					this.setProps({
						formState: {
							...(this.props.formState ?? {}),
							login: value,
						},
					});
				},
			}),
			InputDisplayName: new InputField({
				id: 'display-name',
				label: 'Имя в чате',
				class: 'mb-10',
				name: 'display_name',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'firstName');
					(this.children.InputDisplayName as Block).setProps({
						error,
					});

					this.setProps({
						formState: {
							...(this.props.formState ?? {}),
							display_name: value,
						},
					});
				},
			}),
			InputPhone: new InputField({
				id: 'phone',
				label: 'Телефон',
				class: 'mb-10',
				name: 'phone',
				type: 'tel',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'phone');
					(this.children.InputPhone as Block).setProps({ error });

					this.setProps({
						formState: {
							...(this.props.formState ?? {}),
							phone: value,
						},
					});
				},
			}),
			InputEmail: new InputField({
				id: 'email',
				label: 'Почта',
				class: 'mb-10',
				name: 'email',
				type: 'email',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'email');
					(this.children.InputEmail as Block).setProps({ error });

					this.setProps({
						formState: {
							...(this.props.formState ?? {}),
							email: value,
						},
					});
				},
			}),
			InputPassword: new InputField({
				id: 'password',
				label: 'Пароль',
				class: 'mb-20',
				type: 'password',
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'password');
					(this.children.InputPassword as Block).setProps({ error });

					this.setProps({
						formState: {
							...(this.props.formState ?? {}),
							password: value,
						},
					});
				},
			}),
			EditButton: new Button({
				label: 'Сохранить данные',
				size: 'lg',
				type: 'primary',
				class: 'mb-10',
				onClick: (e) => {
					e.preventDefault();
					usersServices.changeProfile(this.props.formState);
				},
			}),
			EditPasswordButton: new Button({
				label: 'Изменить пароль',
				size: 'lg',
				type: 'primary',
				class: 'mb-10',
				onClick: (e) => {
					e.preventDefault();
					this.setProps({ showDialog: 'password' });
				},
			}),
			LogoutButton: new Button({
				label: 'Выйти',
				type: 'outline-primary',
				size: 'lg',
				onClick: (e) => {
					e.preventDefault();
					authServices.logout();
				},
			}),
			BackButton: new BackButton({
				onClick: (e) => {
					e.preventDefault();
					window.router.back();
				},
			}),
			DialogUpload: new DialogUpload({
				onCancel: () => {
					this.setProps({ showDialog: null });
					this.onDialogUploadClose();
				},
				onOk: async () => {
					const file = this.props.selectedFile;
					if (!file) {
						console.error('Файл не выбран');
						return;
					}

					const formData = new FormData();
					formData.append('avatar', file);

					try {
						await usersServices.changeAvatar(formData).then((response) => {
							if (response) {
								this.setProps({ showDialog: null });
								this.setProps({ previewSrc: '' });
								this.children.Avatar.setProps({
									imgUrl: `https://ya-praktikum.tech/api/v2/resources${response.avatar}`,
								});
								this.onDialogUploadClose();
							}
						});
					} catch (error) {
						console.error('Ошибка загрузки аватара:', error);
					}
				},
			}),
			DialogPassword: new DialogPassword({
				onCancel: () => {
					this.setProps({ showDialog: null });
				},
				onOk: async (formData) => {
					try {
						await usersServices.changePassword(formData);
						this.setProps({ showDialog: null });
					} catch (error) {
						console.error('Ошибка смены пароля:', error);
					}
				},
			}),
		});
	}

	onDialogUploadClose() {
		const DialogUpload = this.children.DialogUpload;
		const Dialog = DialogUpload.children.Dialog;
		const Body = Dialog.children.Body;
		const FileUpload = Body.children.FileUpload;
		FileUpload.resetPreview();
	}
	componentDidMount() {
		this.loadData(this?.props?.user as Record<string, unknown>);
	}

	componentDidUpdate(oldProps: DefaultProps, newProps: DefaultProps) {
		if (oldProps.user !== newProps.user) {
			this.loadData(newProps.user as Record<string, unknown>);
		}
		return true;
	}

	loadData(source: Record<string, unknown>) {
		if (!source) return;
		(this.children.Avatar as Block).setProps({
			imgUrl:
				`https://ya-praktikum.tech/api/v2/resources/${source?.avatar}`
				|| '',
		});
		(this.children.InputLogin as Block).setProps({
			value: source?.login || '',
		});
		(this.children.InputPhone as Block).setProps({
			value: source?.phone || '',
		});
		(this.children.InputEmail as Block).setProps({
			value: source?.email || '',
		});
		(this.children.InputFirstName as Block).setProps({
			value: source?.first_name || '',
		});
		(this.children.InputSecondName as Block).setProps({
			value: source?.second_name || '',
		});
		(this.children.InputDisplayName as Block).setProps({
			value: source?.display_name || '',
		});
	}

	public render(): string {
		return `
		{{{ BackButton }}}
		<div class="container w-100">
			<form class="card w-100">
				<div class="profile__avatar mb-20">
					{{{ Avatar }}}
					{{#if user }}
						<div class="user-name mb-20">{{ user.first_name }}</div>
					{{/if}}
				</div>
				{{{ InputEmail }}}
				{{{ InputLogin }}}
				{{{ InputFirstName }}}
				{{{ InputSecondName }}}
				{{{ InputDisplayName }}}
				{{{ InputPhone }}}
				<div class="mt-20">
					{{{ EditButton }}}
					{{{ EditPasswordButton }}}
					{{{ LogoutButton }}}
				</div>
			</form>
		</div>
		{{#if (eq showDialog "upload") }}
			{{{ DialogUpload }}}
		{{/if}}
		{{#if (eq showDialog "password") }}
			{{{ DialogPassword }}}
		{{/if}}
    	`;
	}
}

const mapStateToProps = (state: Record<string, unknown>) => ({
	isLoading: state.isLoading,
	user: state.user,
	selectedFile: state.selectedFile,
});

export default connect(mapStateToProps)(ProfilePage);
