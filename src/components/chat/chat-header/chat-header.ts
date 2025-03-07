import Block from '@/core/block';
import { Avatar } from '@/components';

export default class ChatHeader extends Block {
	constructor(props) {
		super('header', {
			...props,
			className: 'chat__header',
			events: {
				click: (e) => {
					if (e.target.classList.contains('js_dialog-add')) {
						if (this.props.onUserAddClick) {
							this.props.onUserAddClick();
						}
					}
					if (e.target.classList.contains('js_dialog-delete')) {
						if (this.props.onUserDeleteClick) {
							this.props.onUserDeleteClick();
						}
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
		this.children.Avatar.setProps({
			imgUrl: this.props.activeChatImg,
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
