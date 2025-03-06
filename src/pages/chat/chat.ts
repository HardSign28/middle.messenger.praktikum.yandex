import {
	ChatFooter,
	ChatHeader,
	ChatMessages,
	ChatSearch,
	ListContacts,
} from '@/components';
import { groupMessages } from '@/utils/groupMessages';
import Block from '@/core/block';
import { messages } from '@/data/messages';
import { generateContacts } from '@/utils/generateContacts';

export default class ChatPage extends Block {
	constructor(props) {
		const contacts = generateContacts() || []; // Генерируем один раз

		super('main', {
			...props,
			className: 'page-chat',
			contacts,
			filteredContacts: contacts, // Используем один и тот же массив

			ChatSearch: new ChatSearch({
				label: 'Поиск',
				type: 'outline-primary',
				onChange: (e) => {
					const searchTerm = e.target.value.toLowerCase();
					const filtered = this.props.contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm));
					setTimeout(() => {
						this.setProps({ filteredContacts: filtered });
						this.setProps({ contacts: filtered });
						this.children.ChatMessages.setProps({
							contacts: filtered, // Передаём уже сгенерированные контакты
							/*
							onSelectContact: (index) => {
								const selectedContact = filtered[index]?.name;
								const filteredMessages = messages.filter((msg) => msg.name === selectedContact);
								this.setProps({
									activeContactIndex: index,
									hasActiveContact: index >= 0,
									activeContactMessages: groupMessages(filteredMessages),
								});

								this.children.ChatMessages.setProps({
									chatGroups: groupMessages(filteredMessages),
								});
							}, */
						});

						console.log('filteredContacts', this.props.filteredContacts);
					}, 2000);
					//
				},
			}),

			activeContactIndex: -1,
			hasActiveContact: false,

			ChatHeader: new ChatHeader({
				name: 'Петя',
				activeChatImg: '',
			}),
			ChatFooter: new ChatFooter({}),
			ChatMessages: new ChatMessages({ chatGroups: [] }),

			ListContacts: new ListContacts({
				contacts, // Передаём уже сгенерированные контакты
				onSelectContact: (index) => {
					const selectedContact = this.props.contacts[index]?.name;
					const filteredMessages = messages.filter((msg) => msg.name === selectedContact);
					this.setProps({
						activeContactIndex: index,
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
					<div class="chat__content-empty">Выберите чат, чтобы отправить сообщение</div>
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
