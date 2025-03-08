import InputField from '@/components/input/inputField';
import { Button } from '@/components';
import Block from '@/core/block';
import { validateField, validateAll } from '@/utils/validateField';

type LoginPageProps = Record<string, unknown>;
export default class LoginPage extends Block {
	constructor(props: LoginPageProps) {
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
			className: 'page page-login bg-gradient',
			InputLogin: new InputField({
				label: 'Логин',
				class: 'mb-20',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'login');
					this.children.InputLogin.setProps({ error });
					this.setProps({
						formState: {
							...this.props.formState ?? {},
							login: value,
						},
					});
				},
			}),
			InputPassword: new InputField({
				label: 'Пароль',
				class: 'mb-20',
				type: 'password',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'password');
					this.children.InputPassword.setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState ?? {},
							password: value,
						},
					});
				},
			}),
			SignInButton: new Button({
				label: 'Войти',
				size: 'lg',
				type: 'primary',
				class: 'mb-10',
				onClick: (e) => {
					e.preventDefault();
					validateAll(this.props.formState as Record<string, string>, this.children, 'login', 'password');
					// eslint-disable-next-line no-console
					console.log(this.props.formState);
				},
			}),
			SignUpButton: new Button({
				label: 'Зарегистрироваться',
				type: 'outline-primary',
			}),
		});
	}

	public render(): string {
		return `
		<div class="container w-100">
			<section class="card">
				<h1 id="login-title" class="card__title text-center">Авторизация</h1>
				<form action="/login" method="POST" aria-labelledby="login-title">
					{{{ InputLogin }}}
					{{{ InputPassword }}}
					{{{ SignInButton }}}
					{{{ SignUpButton }}}
				</form>
			</section>
		</div>
    	`;
	}
}
