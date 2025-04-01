import Block from '@/core/block';
import { Dialog } from '@/components';
import { DefaultProps } from '@/types/props';
import { DialogChatUsersProps } from '@/types/dialog';

interface FormState {
	title: string;
}

class DialogBody extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,
			events: {
				click: (e: MouseEvent) => {
					const target = e.target as HTMLElement;
					if (target.classList.contains('js_dialog-delete') && typeof this.props.onOk === 'function') {
						const dataId = Number(target.dataset.id);
						this.props.onOk?.(dataId);
					}
				},
			},
		});
	}

	render(): string {
		return `
			<ul>
			{{#each chatUsers }}
			<li class="chat__menu__list-item">
				<div class="chat__menu__list-item-content">
					<figure class="avatar__image"
						itemscope
						itemtype="https://schema.org/ImageObject"
						>
						{{#if avatar }}
							<img src="https://ya-praktikum.tech/api/v2/resources{{ avatar }}"
								alt="Аватар пользователя"
								itemprop="contentUrl"
								class="avatar__photo">
						{{ else }}
							{{{ defaultAvatar }}}
						{{/if}}
						{{#if edit }}
							<div class="avatar__overlay">
								<span class="avatar__text">Поменять аватар</span>
							</div>
						{{/if}}
					</figure>
					{{ first_name }}
				</div>
				<i class="chat__menu__icon _delete js_dialog-delete" data-id="{{ id }}"></i>
			</li>
			{{/each}}
			</ul>
		`;
	}
}

export default class DialogChatUsers extends Block {
	constructor(props: DialogChatUsersProps) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Список участников',
				labelCancel: 'Отмена',
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
			title: (formState as FormState).title,
		};
	}

	public render(): string {
		return `
			{{{ Dialog }}}
    	`;
	}
}
