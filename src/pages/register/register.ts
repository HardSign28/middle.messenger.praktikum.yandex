import { Button } from '@/components';
import Block from '@/core/block';
import InputField from '@/components/input/inputField.ts';

export default class RegisterPage extends Block {
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
			className: 'page page-register bg-gradient',
			InputFirstName: new InputField({
				id: 'first-name',
				label: 'Имя',
				class: 'mb-20',
				name: 'first_name',
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
				class: 'mb-20',
				name: 'second_name',
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
				class: 'mb-20',
				name: 'login',
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
			InputPhone: new InputField({
				id: 'phone',
				label: 'Телефон',
				class: 'mb-20',
				name: 'phone',
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
				label: 'Email',
				class: 'mb-20',
				name: 'email',
				type: 'email',
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
			SignInButton: new Button({
				label: 'Войти',
				type: 'outline-primary',

				onClick: (e) => {
					e.preventDefault();
					console.log(this.props.formState.login);
				},
			}),
			SignUpButton: new Button({
				label: 'Зарегистрироваться',
				type: 'primary',
				size: 'lg',
				class: 'mb-10',
			}),
		});
	}

	public render(): string {
		return `
		<div class="container w-100">
			<section class="card">
			<h1 class="card__title text-center">Регистрация</h1>
			<form>
				{{{ InputFirstName }}}
				{{{ InputSecondName }}}
				{{{ InputLogin }}}
				{{{ InputPhone }}}
				{{{ InputEmail }}}
				{{{ InputPassword }}}
			<div class="mt-20">
				{{{ SignUpButton }}}
				{{{ SignInButton }}}
			</div>
			</form>
			</section>			
		</div>
    	`;
	}
}
