import Block from '@/core/block';
import { Input } from '@/components';

type ChatFooterProps = Record<string, unknown>;
export default class ChatFooter extends Block {
	constructor(props: ChatFooterProps) {
		super('footer', {
			...props,
			className: 'chat__footer',
			Input: new Input({
				name: 'message',
				className: 'chat__footer-message-input',
				placeholder: 'Сообщение',
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
		<div class="chat__footer-send"></div>
    	`;
	}
}
