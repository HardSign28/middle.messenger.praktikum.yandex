import Block from '@/core/block';
import { Avatar } from '@/components';
import { AvatarProps } from '@/types/avatar';
import { ChatHeaderProps } from '@/types/chat';
/* eslint-disable import/no-unresolved */
import usersIcon from '@/assets/icons/people.svg?raw';
import addUserIcon from '@/assets/icons/person-add.svg?raw';
import chatDeleteIcon from '@/assets/icons/trash.svg?raw';
/* eslint-enable import/no-unresolved */
export default class ChatHeader extends Block {
	constructor(props: ChatHeaderProps) {
		super('header', {
			...props,
			className: 'chat__header',
			events: {
				click: (e: MouseEvent) => {
					const target = e.target as HTMLElement;
					if (target.classList.contains('js_dialog-add') && typeof this.props.onUserAddClick === 'function') {
						this.props.onUserAddClick?.();
					}
					if (target.classList.contains('js_dialog-users') && typeof this.props.onShowDialogChatUsers === 'function') {
						const dataId = Number(target.dataset.id);
						this.props.onShowDialogChatUsers?.(dataId);
					}
					if (target.classList.contains('js_dialog-delete-chat') && typeof this.props.onUserDeleteChatClick === 'function') {
						if (this.props?.chatId) {
							this.props.onUserDeleteChatClick?.(this.props?.chatId);
						} else {
							window.store.setAlertMessage({
								status: 'error',
								message: 'Не удалось удалить чат',
							});
						}
					}
				},
			},
			chatUsers: [],
			Avatar: new Avatar({
				class: 'chat__header-avatar',
				imgUrl: props.activeChatImg,
			}),
		});
	}

	public render(): string {
		(this.children.Avatar as Block<AvatarProps>).setProps({
			imgUrl: this.props.activeChatImg as string,
		});
		return `
		<div class="chat__header-left-side">
			{{{ Avatar }}}
			<div>{{ name }}</div>
		</div>
		<div class="chat__header-right-side">
			<div class="chat__menu">
				<div class="chat__menu__container">
					<ul class="chat__menu__list">
						<li class="chat__menu__list-item js_dialog-add">
							<div class="chat__menu__icon icon-add-user">${addUserIcon}</div>
							Добавить участника
						</li>
						<li class="chat__menu__list-item js_dialog-users">
							<div class="chat__menu__icon icon-users">${usersIcon}</div>
							Список участников
						</li>
						<li class="chat__menu__list-item js_dialog-delete-chat">
							<div class="chat__menu__icon icon-delete">${chatDeleteIcon}</div>
							Удалить чат
						</li>
					</ul>
				</div>
			</div>
		</div>
    	`;
	}
}
