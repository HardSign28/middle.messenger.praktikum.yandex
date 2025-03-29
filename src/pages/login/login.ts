import InputField from '@/components/input/inputField';
import { Button } from '@/components';
import Block from '@/core/block';
import { validateField, validateAll } from '@/utils/validateField';
import { DefaultProps } from '@/types/props';
import { connect } from '@/utils/connect';
import * as authServices from '@/services/auth';
import { ROUTER } from '@/constants';
import { LoginModelType } from '@/types/api';

class LoginPage extends Block {
	constructor(props: DefaultProps) {
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
					(this.children.InputLogin as Block).setProps({
						error,
						value,
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
					(this.children.InputPassword as Block).setProps({
						error,
						value,
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
					const childrenBlocks = Object.fromEntries(
						Object.entries(this.children)
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							.filter(([_, child]) => !Array.isArray(child))
							.map(([key, child]) => [key, child as Block]),
					);

					const formData = {
						login: (this.children.InputLogin as Block).props.value,
						password: (this.children.InputPassword as Block).props.value,
					};

					validateAll(formData as Record<string, string>, childrenBlocks, 'login', 'password');
					const formDataErrors = [
						!!(this.children.InputLogin as unknown as Block<{ error: string }>)
							.props?.error?.length,
						!!(this.children.InputPassword as unknown as Block<{ error: string }>)
							.props?.error?.length,
					];

					// Если есть ошибки в форме - не отправляем запрос
					if (formDataErrors.some(Boolean)) return;

					authServices.login(formData as LoginModelType);
				},
			}),
			SignUpButton: new Button({
				label: 'Зарегистрироваться',
				type: 'outline-primary',
				onClick: (e) => {
					e.preventDefault();
					window.router.go(ROUTER.register);
				},
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
					{{#if loginError }}
					<p>{{loginError}}</p>
					{{/if}}
					{{{ SignInButton }}}
					{{{ SignUpButton }}}
				</form>
			</section>
		</div>
    	`;
	}
}
const mapStateToProps = (state: Record<string, unknown>) => ({
	isLoading: state.isLoading,
	loginError: state.loginError,
});

export default connect(mapStateToProps)(LoginPage);
