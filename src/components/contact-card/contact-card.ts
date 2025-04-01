import Block from '@/core/block';
import { Avatar } from '@/components';
import { ContactCardProps } from '@/types/chat';
import { formatDateChatList } from '@/utils/formatDate';
import { connect } from '@/utils/connect';

class ContactCard extends Block {
	constructor(props: ContactCardProps) {
		super('div', {
			...props,
			Avatar: new Avatar({
				size: 'sm',
				class: 'chat__avatar',
				imgUrl: props.avatar,
			}),
			events: {
				click: props.onClick,
			},
			formatDateChatList: props?.last_message?.time
				? formatDateChatList(props.last_message.time)
				: '',
		});
	}

	public render(): string {
		return `
			<article class="contact-card {{#if active }}contact-card_active{{/if}}">
				{{{ Avatar }}}
				<div class="contact-card-content">
					<div class="contact-card-head">
						<div class="contact-card-head__name">{{ title }}</div>
						<div class="contact-card-head__meta">{{ formatDateChatList }}</div>
					</div>
					<div class="contact-card-body">
						<div class="contact-card-text">
							{{#if (eq last_message.user.login user.login) }}
								<strong class="contact-card-text-highlight">Вы:</strong>
							{{/if}}
							{{ last_message.content }}
						</div>
						{{#if unread_count }}
							<div class="contact-card-unread">{{ unread_count }}</div>
						{{/if}}
					</div>
				</div>
			</article>
    	`;
	}
}

const mapStateToProps = (state: Record<string, unknown>) => ({
	isLoading: state.isLoading,
	user: state.user,
});

export default connect(mapStateToProps)(ContactCard);
