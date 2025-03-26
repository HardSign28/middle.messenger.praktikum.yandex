import Block from '@/core/block';
import { ChatMessagesProps } from '@/types/chat';

export default class ChatMessages extends Block {
	constructor(props: ChatMessagesProps) {
		super('section', {
			...props,
			className: 'chat__messages',
			chatGroups: props.chatGroups || [],
		});
	}

	public render(): string {
		console.log('chatGroups', this.props.chatGroups);
		return `
			{{#each chatGroups }}
				<time class="chat__messages-date">
					{{ @key }}
				</time>
				{{#each this }}
					<article class="chat__message-group chat__message-group--{{ sender }}">
						{{#each messages }}
							<div class="chat__message chat__message--{{ sender }} {{#if img }}chat__message_img{{/if}}">
								{{{ content }}}
								<div class="chat__message-meta">
									{{#if (eq sender 'me') }}
										{{#if is_read }}
											<div class="double-check"></div>
										{{/if}}
									{{/if}}
									{{ time }}
								</div>
							</div>
						{{/each}}
					</article>
				{{/each}}
			{{/each}}
    	`;
	}
}
