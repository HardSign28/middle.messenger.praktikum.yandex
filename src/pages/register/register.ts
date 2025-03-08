import { Button } from '@/components';
import Block from '@/core/block';
import InputField from '@/components/input/inputField';
import { validateAll, validateField } from '@/utils/validateField';

export default class RegisterPage extends Block {
	constructor(props) {
		super('main', {
			...props,
			formState: {
				login: '',
				password: '',
				first_name: '',
				second_name: '',
				email: '',
				phone: '',
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
					const { value } = e.target;
					const error = validateField(value, 'firstName');
					this.children.InputFirstName.setProps({ error });

					this.setProps({
						formState: {
							...this.props.formState,
							first_name: value,
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
					const { value } = e.target;
					const error = validateField(value, 'secondName');
					this.children.InputSecondName.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							second_name: value,
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
					const { value } = e.target;
					const error = validateField(value, 'login');
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
					const { value } = e.target;
					const error = validateField(value, 'phone');
					this.children.InputPhone.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							phone: value,
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
					const { value } = e.target;
					const error = validateField(value, 'email');
					this.children.InputEmail.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
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
					const { value } = e.target;
					const error = validateField(value, 'password');
					this.children.InputPassword.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState,
							password: value,
						},
					});
				},
			}),
			SignInButton: new Button({
				label: 'Войти',
				type: 'outline-primary',

				onClick: (e) => {
					e.preventDefault();
				},
			}),
			SignUpButton: new Button({
				label: 'Зарегистрироваться',
				type: 'primary',
				size: 'lg',
				class: 'mb-10',
				onClick: (e) => {
					e.preventDefault();
					validateAll(this.props.formState, this.children, 'login', 'password', 'firstName', 'secondName', 'phone', 'email');
					// eslint-disable-next-line no-console
					console.log(this.props.formState);
				},
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
