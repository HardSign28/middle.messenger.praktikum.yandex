import { Button } from '@/components';
import { BackButton } from '@/components';
import Block from '@/core/block';
import InputField from '@/components/input/inputField.ts';

export default class ProfilePage extends Block {
	constructor(props) {
		super('main', {
			...props,
			formState: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			className: 'page page-profile',
			InputFirstName: new InputField({
				id: 'first-name',
				label: 'Имя',
				class: 'mb-10',
				name: 'first_name',
				value: 'Иван',
				readonly: true,
				onChange: (e) => {
					const value = e.target.value;
					let error = '';
					if (value === 'error') {
						error = 'Some error is happened.';
					}
					if (value.length < 3) {
						error = 'More 3 characters.';
					}
					this.children.InputFirstName.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							login: value,
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
					const value = e.target.value;
					let error = '';
					if (value.length < 3) {
						error = 'More 3 characters.';
					}
					this.children.InputSecondName.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							login: value,
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
					const value = e.target.value;
					let error = '';
					if (value.length < 3) {
						error = 'More 3 characters.';
					}
					this.children.InputLogin.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
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
					const value = e.target.value;
					let error = '';
					if (value.length < 3) {
						error = 'More 3 characters.';
					}
					this.children.InputDisplayName.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							login: value,
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
				value: '+7 (909) 967 30 30',
				readonly: true,
				onChange: (e) => {
					const value = e.target.value;
					let error = '';
					if (value.length < 3) {
						error = 'More 3 characters.';
					}
					this.children.InputPhone.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							login: value,
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
					const value = e.target.value;
					let error = '';
					if (value.length < 3) {
						error = 'More 3 characters.';
					}
					this.children.InputEmail.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							login: value,
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
					const value = e.target.value;
					let error = '';
					if (value === 'error') {
						error = 'Some error is happened.';
					}
					if (value.length < 3) {
						error = 'More 3 characters.';
					}
					this.children.InputPassword.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							login: value,
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
					console.log(this.props.formState.login);
				},
			}),
			EditPasswordButton: new Button({
				label: 'Изменить пароль',
				size: 'lg',
				type: 'primary',
				class: 'mb-10',
				onClick: (e) => {
					e.preventDefault();
					console.log(this.props.formState.login);
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
					alert('sdfdsf')
				},
			}),
		});
	}

	public render(): string {
		return `
		{{{ BackButton }}}
		<div class="container w-100">
			<form class="card w-100">
				<div class="profile__avatar mb-20">
					{{> Avatar size="md" class="mb-20" name="Иван" edit="true" imgUrl=""}}
					<div class="user-name mb-20">Иван</div>
				</div>
				{{{ InputEmail }}}
				{{{ inputLogin }}}
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
    	`;
	}
}
