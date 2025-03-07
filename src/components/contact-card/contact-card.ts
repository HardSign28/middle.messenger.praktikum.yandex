import Block from '@/core/block';
import { Avatar } from '@/components';

export default class ContactCard extends Block {
	constructor(props) {
		super('div', {
			...props,
			// className: ContactCard.getClassName(props),

			Avatar: new Avatar({
				size: 'sm',
				class: 'chat__avatar',
				imgUrl: props.avatar,
			}),
			events: {
				click: props.onClick,
			},
		});
	}

	public render(): string {
		return `
			<article class="contact-card {{#if active }}contact-card_active{{/if}}">
				{{{ Avatar }}}
				<div class="contact-card-content">
					<div class="contact-card-head">
						<div class="contact-card-head__name">{{ name }}</div>
						<div class="contact-card-head__meta">{{ date }}</div>
					</div>
					<div class="contact-card-body">
						<div class="contact-card-text">
							{{#if you }}
								<strong class="contact-card-text-highlight">Вы:</strong>
							{{/if}}
							{{{ text }}}
						</div>
						{{#if unread }}
							<div class="contact-card-unread">{{ unread }}</div>
						{{/if}}
					</div>
				</div>
			</article>
    	`;
	}
}
