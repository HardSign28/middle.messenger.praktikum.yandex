import Block from '@/core/block';

export default class ChatFooter extends Block {
	constructor(props) {
		super('footer', {
			...props,
			formState: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			className: 'chat__footer',
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
			<input
				name="message"
				class="chat__footer-message-input"
				placeholder="Сообщение"
			/>
		</div>
		<div class="chat__footer-send"></div>
    	`;
	}
}
