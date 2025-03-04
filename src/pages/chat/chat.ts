import {ChatFooter, ChatHeader, ChatMessages, ChatSearch, ListContacts} from '@/components';
import { groupMessages } from '@/utils/groupMessages';
import Block from '@/core/block';
import {messages} from '@/data/messages.ts';
import {contacts} from '@/data/contacts.ts';

export default class ChatPage extends Block {
	constructor(props) {
		super('main', {
			...props,
			formState: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			className: 'page-chat',
			ChatSearch: new ChatSearch({
				label: 'Зарегистрироваться',
				type: 'outline-primary',
			}),
			activeContactIndex: -1,
			ChatHeader: new ChatHeader({

			}),
			ChatFooter: new ChatFooter({

			}),
			contacts,
			hasActiveContact: false,
			ChatMessages: new ChatMessages({
				chatGroups: []
			}),
			ListContacts: new ListContacts({
				contacts,
				onSelectContact: (index) => {
					const selectedContact = this.props.contacts[index]?.name;
					console.log('selectedContact', selectedContact);
					const filteredMessages = messages.filter((msg) =>
						msg.contact === selectedContact
					);
					this.setProps({
						activeContactIndex: index, //TODO: Можно удалить
						hasActiveContact: index >= 0,
						activeContactMessages: groupMessages(filteredMessages),
					});
					this.children.ChatMessages.setProps({
						chatGroups: groupMessages(filteredMessages),
					});
				},
			}),
		});
	}

	public render(): string {
		return `
		<section class="chat">
			<aside class="chat__list">
				{{{ ChatSearch }}}
				{{{ ListContacts }}}
			</aside>
			<section class="chat__content {{#if hasActiveContact }}chat__content_bg{{/if }}">
				{{#if hasActiveContact }}
				{{{ ChatHeader }}}
			<section class="chat__messages">
			<time class="chat__messages-date">
				{{ conversationDate }}
			</time>
				{{{ ChatMessages }}}
			</section>
				{{{ ChatFooter }}}
				{{ else }}
			<div class="chat__content-empty">Выберите чат чтобы отправить сообщение</div>
				{{/if}}
			</section>
		</section>
		{{#if (eq showDialog "remove") }}
		{{> DialogRemove userName="Вадим" }}
		{{/if}}
		{{#if (eq showDialog "add") }}
		{{> DialogAdd }}
		{{/if}}
    	`;
	}
}
