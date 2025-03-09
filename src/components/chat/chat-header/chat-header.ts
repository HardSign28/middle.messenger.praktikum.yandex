import Block from '@/core/block';
import { Avatar } from '@/components';
import { AvatarProps } from '@/types/avatar';

type ChatHeaderProps = {
	onUserAddClick?: () => void;
	onUserDeleteClick?: () => void;
	activeChatImg?: string;
	name?: string;
}

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
						this.props.onUserDeleteClick?.();
					}
				},
			},
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
						<li class="chat__menu__list-item js_dialog-delete">
							<i class="chat__menu__icon _delete"></i>
							Удалить пользователя
						</li>
					</ul>
				</div>
			</div>
		</div>
    	`;
	}
}
