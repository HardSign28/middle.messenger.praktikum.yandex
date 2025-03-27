import Block from '@/core/block';
import { Button, Input } from '@/components';
import { DefaultProps, InputProps } from '@/types/props';
import { ButtonProps } from '@/types/button';

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
					input: (e: InputEvent) => {
						const { value } = e.target as HTMLInputElement;
						(this.children.Input as Block).setProps({
							value,
						});
					},
					keydown: (e: KeyboardEvent) => {
						if (e.key === 'Enter') {
							const sendButton = this.children.SendButton as Block<ButtonProps>;
							sendButton.props?.onClick?.(e as unknown as MouseEvent);
						}
					},
				},
			}),
			SendButton: new Button({
				class: 'chat__footer-send',
				onClick: (e: MouseEvent) => {
					e.preventDefault();
					const input = this.children.Input as Block<InputProps>;
					const message = input.props.value || '';
					if (typeof this.props.onSendButtonClick === 'function') {
						this.props.onSendButtonClick(message);
					}
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
