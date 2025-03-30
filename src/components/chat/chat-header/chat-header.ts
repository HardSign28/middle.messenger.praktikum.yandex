import Block from '@/core/block';
import { Avatar } from '@/components';
import { AvatarProps } from '@/types/avatar';
import { ChatHeaderProps } from '@/types/chat';

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
					if (target.classList.contains('js_dialog-delete') && typeof this.props.onUserDeleteClick === 'function') {
						const dataName = target.dataset.name;
						this.props.onUserDeleteClick?.(dataName);
					}
					if (target.classList.contains('js_dialog-delete-chat') && typeof this.props.onUserDeleteClick === 'function') {
						if (this.props?.chatId && typeof this.props?.onUserDeleteChatClick === 'function') {
							this.props.onUserDeleteChatClick?.(this.props?.chatId);
						} else {
							throw new Error('Не удалось удалить чат');
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
							<i class="chat__menu__icon _add"></i>
							Добавить пользователя
						</li>
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
							<i class="chat__menu__icon _delete js_dialog-delete" data-name="{{ first_name }}"></i>
						</li>
						{{/each}}
						<li class="chat__menu__list-item">
							Удалить чат
							<i class="chat__menu__icon _delete js_dialog-delete-chat"></i>
						</li>
					</ul>
				</div>
			</div>
		</div>
    	`;
	}
}
