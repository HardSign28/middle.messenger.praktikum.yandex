import Block from '@/core/block';
import { Button, Dialog } from '@/components';
import InputField from '@/components/input/inputField';
import { validateField } from '@/utils/validateField';
import { DefaultProps } from '@/types/props';
import { DialogAddProps } from '@/types/dialog';
import * as usersServices from '@/services/users';

interface FormState {
	login: string;
}
class DialogBody extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,

			formState: {
				login: '',
			},
			usersList: [],
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
			SearchButton: new Button({
				label: 'Найти',
				size: 'lg',
				type: 'primary',
				onClick: async (e: MouseEvent) => {
					e.preventDefault();
					const formData = {
						login: (this.children.InputLogin as Block).props.value as string,
					};

					const usersList = await usersServices.findChatUser(formData);
					this.setProps({
						usersList,
					});
				},
			}),
		});
	}

	render(): string {
		return `
			{{{ InputLogin }}}
			{{{ SearchButton }}}
			{{#if usersList }}
			<h4 class="mb-10 mt-20">Найденные пользователи: </h4>
			<div class="user-list mb-20">
				{{#each usersList }}
					<label class="user-list__item">
						<input class="user-list__item-radio" type="radio" name="user" value="{{ id }}">
						Логин: {{ login }} <br> Имя: {{ first_name }}
					</label>
				{{/each}}
			</div>
			{{/if }}
		`;
	}
}

export default class DialogAdd extends Block {
	constructor(props: DialogAddProps) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Добавить пользователя',
				labelOk: 'Добавить',
				labelCancel: 'Отмена',
				onOk: async () => {
					const userId = Number(
						(document.querySelector('input[name="user"]:checked') as HTMLInputElement)?.value,
					);

					if (!userId) {
						(this.children.Dialog as Dialog).setError('Пользователь не выбран');
						return;
					}

					if (props.onOk) {
						props.onOk(userId);
					}
				},
				onCancel: props.onCancel,
				Body: new DialogBody(props),
			}),
		});
	}

	getFormData() {
		const dialog = this.children.Dialog;

		if (Array.isArray(dialog)) {
			throw new Error('Unexpected structure: Dialog is an array');
		}

		const { formState } = (dialog.children.Body as Block).props;
		return {
			login: (formState as FormState).login,
		};
	}

	public render(): string {
		return `
			{{{ Dialog }}}
    	`;
	}
}
