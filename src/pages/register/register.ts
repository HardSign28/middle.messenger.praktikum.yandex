import { Button } from '@/components';
import Block from '@/core/block';
import InputField from '@/components/input/inputField';
import { validateAll, validateField } from '@/utils/validateField';
import { DefaultProps } from '@/types/props';
import { ROUTER } from '@/constants';
import * as authServices from '@/services/auth';
import { connect } from '@/utils/connect';

class RegisterPage extends Block {
	constructor(props: DefaultProps) {
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
				onChange: (e: InputEvent) => {
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
				class: 'mb-20',
				name: 'second_name',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'secondName');
					(this.children.InputSecondName as Block).setProps({
						error,
					});

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
				class: 'mb-20',
				name: 'login',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'login');
					(this.children.InputLogin as Block).setProps({
						error,
					});

					this.setProps({
						formState: {
							...this.props.formState ?? {},
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
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'phone');
					(this.children.InputPhone as Block).setProps({
						error,
					});

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
				label: 'Email',
				class: 'mb-20',
				name: 'email',
				type: 'email',
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'email');
					(this.children.InputEmail as Block).setProps({
						error,
					});

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
				onChange: (e: InputEvent) => {
					const { value } = e.target as HTMLInputElement;
					const error = validateField(value, 'password');
					(this.children.InputPassword as Block).setProps({
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
				type: 'outline-primary',

				onClick: (e) => {
					e.preventDefault();
					window.router.go(ROUTER.login);
				},
			}),
			SignUpButton: new Button({
				label: 'Зарегистрироваться',
				type: 'primary',
				size: 'lg',
				class: 'mb-10',
				onClick: (e) => {
					e.preventDefault();
					const childrenBlocks = Object.fromEntries(
						Object.entries(this.children)
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							.filter(([_, child]) => !Array.isArray(child))
							.map(([key, child]) => [key, child as Block]),
					);
					validateAll(this.props.formState as Record<string, string>, childrenBlocks, 'login', 'password', 'firstName', 'secondName', 'phone', 'email');
					// eslint-disable-next-line no-console
					// console.log(this.props.formState);
					authServices.register(this.props.formState);
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
				{{#if registerError }}
					<p>{{registerError}}</p>
				{{/if}}
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

const mapStateToProps = (state) => {
	return {
		isLoading: state.isLoading,
		registerError: state.registerError,
	};
};

export default connect(mapStateToProps)(RegisterPage);
