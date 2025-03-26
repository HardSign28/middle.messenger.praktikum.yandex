import Block from '@/core/block';
import { Button, Input } from '@/components';
import { DefaultProps } from '@/types/props';

export default class ChatFooter extends Block {
	constructor(props: DefaultProps) {
		super('footer', {
			...props,
			className: 'chat__footer',
			Input: new Input({
				name: 'message',
				className: 'chat__footer-message-input',
				placeholder: 'Сообщение',
				events: {
					input: (e) => {
						const { value } = e.target;
						this.children.Input.setProps({
							value,
						});
					},
					keydown: (e) => {
						if (e.key === 'Enter') {
							// Выполняем onClick для кнопки отправки
							this.children.SendButton.props.onClick(e);
						}
					},
				},
			}),
			SendButton: new Button({
				class: 'chat__footer-send',
				onClick: (e: MouseEvent) => {
					e.preventDefault();
					this.props.onSendButtonClick(this.children.Input.props.value);
				},
			}),
		});
	}

	public render(): string {
		return `
		<div class="chat__footer-attach">
			<div class="chat__footer-attach__container">
				<ul class="chat__footer-attach__list">
					<li class="chat__footer-attach__list-item">
						<i class="chat__footer-attach__icon _media"></i>
						Фото или Видео
					</li>
					<li class="chat__footer-attach__list-item">
						<i class="chat__footer-attach__icon _file"></i>
						Файл
					</li>
					<li class="chat__footer-attach__list-item">
						<i class="chat__footer-attach__icon _geo"></i>
						Локация
					</li>
				</ul>
			</div>
		</div>
		<div class="chat__footer-message-box">
			{{{ Input }}}
		</div>
		{{{ SendButton }}}
    	`;
	}
}
