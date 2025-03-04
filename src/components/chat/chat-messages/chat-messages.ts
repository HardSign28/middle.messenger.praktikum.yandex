import Block from '@/core/block';

export default class ChatMessages extends Block {
	constructor(props) {
		super('div', {
			...props,
			chatGroups: props.chatGroups || [],
		});
	}
	public render(): string {
		return `
			{{#each chatGroups }}
				<article class="chat__message-group chat__message-group--{{ sender }}">
					{{#each messages }}
						<div class="chat__message chat__message--{{../sender}} {{#if img }}chat__message_img{{/if}}">
							{{{ text }}}
							<div class="chat__message-meta">
								{{#if seen }}
									<div class="double-check"></div>
								{{/if}}
								{{ time }}
							</div>
						</div>
					{{/each}}
				</article>
			{{/each}}
    	`;
	}
}
