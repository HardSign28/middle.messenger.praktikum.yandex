import Block from '@/core/block';
import { ChatMessagesProps } from '@/types/chat';
import { DefaultProps } from '@/types/props';

export default class ChatMessages extends Block {
	constructor(props: ChatMessagesProps) {
		super('section', {
			...props,
			className: 'chat__messages',
			attrs: ChatMessages.getAttributes(props),
			chatGroups: props.chatGroups || [],
		});
	}

	static getAttributes(props: DefaultProps) {
		return {
			...(props.id ? { id: props.id } : {}),
		};
	}

	public render(): string {
		return `
			{{#each chatGroups }}
				<time class="chat__messages-date">
					{{ @key }}
				</time>
				{{#each this }}
					<article class="chat__message-group chat__message-group--{{ sender }}">
						{{#each messages }}
							<div class="chat__message chat__message--{{ sender }} {{#if img }}chat__message_img{{/if}}">
								{{ content }}
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
