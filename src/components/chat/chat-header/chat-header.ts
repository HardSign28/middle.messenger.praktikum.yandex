import Block from '@/core/block';
import {Avatar} from '@/components';

export default class ChatHeader extends Block {
	constructor(props) {
		super('header', {
			...props,
			formState: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			className: 'chat__header',
			Avatar: new Avatar({
				class: 'chat__header-avatar',
				imgUrl: 'activeChatImg',
			}),
		});
	}

	public render(): string {
		return `
		<div class="chat__header-left-side">
			{{{ Avatar }}}
			<div>{{ name }}</div>
		</div>
		<div class="chat__header-right-side">
			<div class="chat__menu">
				<div class="chat__menu__container">
					<ul class="chat__menu__list">
						<li class="chat__menu__list-item">
							<i class="chat__menu__icon _add"></i>
							Добавить пользователя
						</li>
						<li class="chat__menu__list-item">
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
