import {
	Button,
	BackButton,
	Avatar,
	DialogUpload,
} from '@/components';
import Block from '@/core/block';
import InputField from '@/components/input/inputField';
import { validateField } from '@/utils/validateField';
import { DefaultProps } from '@/types/props';
import { connect } from '@/utils/connect';

class ProfilePage extends Block {
	constructor(props: DefaultProps) {
		super('main', {
			...props,
			formState: {
				login: props.user?.login || '',
				password: '',
				first_name: props.user?.first_name || '',
				second_name: props.user?.second_name || '',
				display_name: props.user?.display_name || '',
				phone: props.user?.phone || '',
				email: props.user?.email || '',
			},

			className: 'page page-profile',
			Avatar: new Avatar({
				size: 'md',
				class: 'mb-20',
				name: 'Иван',
				edit: true,
				imgUrl: '',
				onClick: () => {
					this.setProps({ showDialog: 'upload' });
				},
			}),
			InputFirstName: new InputField({
				id: 'first-name',
				label: 'Имя',
				class: 'mb-10',
				name: 'first_name',
				value: 'Иван',
				readonly: true,

				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'firstName');
					(this.children.InputFirstName as Block).setProps({ error });

					this.setProps({
						formState: {
							...this.props.formState ?? {},
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
				value: 'Иванов',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'secondName');
					(this.children.InputSecondName as Block).setProps({ error });

					this.setProps({
						formState: {
							...this.props.formState ?? {},
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
				value: 'ivanivanov',
				readonly: true,
				onChange: (e) => {
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
			InputDisplayName: new InputField({
				id: 'display-name',
				label: 'Имя в чате',
				class: 'mb-10',
				name: 'display_name',
				value: 'Иван',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'firstName');
					(this.children.InputDisplayName as Block).setProps({ error });

					this.setProps({
						formState: {
							...this.props.formState ?? {},
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
				value: props.user?.phone || '',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'phone');
					(this.children.InputPhone as Block).setProps({ error });

					this.setProps({
						formState: {
							...this.props.formState ?? {},
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
				value: 'pochta@yandex.kz',
				readonly: true,
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'email');
					(this.children.InputEmail as Block).setProps({ error });

					this.setProps({
						formState: {
							...this.props.formState ?? {},
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
							...this.props.formState ?? {},
							password: value,
						},
					});
				},
			}),
			EditButton: new Button({
				label: 'Изменить данные',
				size: 'lg',
				type: 'primary',
				class: 'mb-10',
				onClick: (e) => {
					e.preventDefault();
					// eslint-disable-next-line no-console
					console.log(this.props.formState);
				},
			}),
			EditPasswordButton: new Button({
				label: 'Изменить пароль',
				size: 'lg',
				type: 'primary',
				class: 'mb-10',
				onClick: (e) => {
					e.preventDefault();
					// eslint-disable-next-line no-console
					console.log(this.props.formState);
				},
			}),
			LogoutButton: new Button({
				label: 'Выйти',
				type: 'outline-primary',
				size: 'lg',
			}),
			BackButton: new BackButton({
				// href: '#',
				onClick: (e) => {
					e.preventDefault();
				},
			}),
			DialogUpload: new DialogUpload({
				onCancel: () => {
					this.setProps({ showDialog: null });
				},
			}),
			showDialog: null,
		});
	}

	componentDidMount() {
		console.log('componentDidMount', this.props.user);
	}

	componentDidUpdate(oldProps, newProps) {
		// Проверяем обновления пользователя
		if (oldProps.user !== newProps.user) {
			this.children.InputPhone.setProps({
				value: newProps.user.phone || '',
			});
			this.children.InputEmail.setProps({
				value: newProps.user.email || '',
			});
			this.children.Avatar.setProps({
				name: newProps.user.first_name || '',
			});
			this.children.InputSecondName.setProps({
				value: newProps.user.second_name || '',
			});
			this.children.InputDisplayName.setProps({
				value: newProps.user.display_name || '',
			});
		}

		return true;
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
    	`;
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.isLoading,
		user: state.user,
	};
};
export default connect(mapStateToProps)(ProfilePage);
