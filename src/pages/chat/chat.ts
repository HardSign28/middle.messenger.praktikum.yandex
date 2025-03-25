import {
	Button,
	ChatFooter,
	ChatHeader,
	ChatMessages,
	ChatSearch,
	DialogAdd,
	DialogAddChat,
	DialogRemove,
	ListContacts,
} from '@/components';
import { groupMessages } from '@/utils/groupMessages';
import Block from '@/core/block';
import { messages } from '@/data/messages';
import { ChatPageProps } from '@/types/chat';
import { ROUTER } from '@/constants';
import * as chatServices from '@/services/chat';
import { WSTransport } from '@/core/ws';
import {connect} from '@/utils/connect.ts';

class ChatPage extends Block<ChatPageProps> {
	constructor(props: Partial<ChatPageProps>) {

		super('main', {
			...props,
			className: 'page-chat',
			contacts: [],
			activeContactIndex: -1,
			hasActiveContact: false,
			showDialog: null,
			ChatSearch: new ChatSearch({
				label: 'Поиск',
				type: 'outline-primary',
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const searchTerm = value.toLowerCase();
					const filtered = this.props.contacts.filter(
						(contact) => contact.title.toLowerCase().includes(searchTerm),
					);

					this.children.ListContacts.setProps({
						contacts: filtered,
					});
				},
			}),

			ChatHeader: new ChatHeader({
				onUserAddClick: () => {
					(this.children.DialogAdd as Block).setProps({
						userName: 'ADD',
					});
					this.setProps({
						...this.props,
						showDialog: 'add',
					});
				},
				onUserDeleteClick: () => {
					this.setProps({
						...this.props,
						showDialog: 'remove',
					});
				},
			}),
			ChatFooter: new ChatFooter({}),
			ChatMessages: new ChatMessages({ chatGroups: [] }),
			ListContacts: new ListContacts({
				onSelectContact: async (index) => {
					const selectedContact = this.props.contacts[index];
					const selectedContactName = this.props.contacts[index]?.name;
					const chatConnectData = {
						userId: this.props.user.id,
						chatId: selectedContact?.id,
						token: null,
					};

					// TODO: вынести в функцию
					// Получаем токен для чата
					try {
						const { token } = await chatServices.getChatToken(selectedContact?.id);
						chatConnectData.token = token;
					} catch (error) {
						console.error('Ошибка getChatToken:', error);
					}

					// Получаем список участников чата
					try {
						const response = await chatServices.getChatUsers(selectedContact?.id);
						console.log('getChatUsers', response);
					} catch (error) {
						console.error('Ошибка getChatUsers:', error);
					}

					// Подключаемся к чату по WS
					this.chatConnect(chatConnectData);

					const filteredMessages = messages.filter((msg) => msg.name === selectedContactName);
					this.setProps({
						...this.props,
						activeContactIndex: index,
						hasActiveContact: index >= 0,
						activeContactMessages: groupMessages(filteredMessages),
					});

					(this.children.DialogRemove as Block).setProps({
						userName: selectedContactName,
					});

					(this.children.ChatMessages as Block).setProps({
						chatGroups: groupMessages(filteredMessages),
					});

					(this.children.ChatHeader as Block).setProps({
						name: selectedContactName,
						activeChatImg: this.props.contacts[index]?.avatar,
					});
				},
			}),
			DialogRemove: new DialogRemove({
				userName: 'Иоанн',
				onOk: () => {
					this.setProps({
						...this.props,
						showDialog: null,
					});
				},
				onCancel: () => {
					this.setProps({
						...this.props,
						showDialog: null,
					});
				},
			}),
			DialogAdd: new DialogAdd({
				onOk: () => {
					this.setProps({
						...this.props,
						showDialog: null,
					});
				},
				onCancel: () => {
					this.setProps({
						...this.props,
						showDialog: null,
					});
				},
			}),
			DialogAddChat: new DialogAddChat({
				onOk: async (formData) => {
					try {
						const response = await chatServices.createChat(formData);
						console.log('response', response);
						this.setProps({
							...this.props,
							showDialog: null,
						});
					} catch (error) {
						console.error('Ошибка Создания чата:', error);
					}
				},
				onCancel: () => {
					this.setProps({
						...this.props,
						showDialog: null,
					});
				},
			}),
			SettingsButton: new Button({
				label: 'Настройки',
				type: 'outline-primary',
				size: 'xs',
				class: 'mb-10',
				onClick: () => {
					window.router.go(ROUTER.profile);
				},
			}),

			AddChat: new Button({
				label: 'Создать чат',
				type: 'outline-primary',
				size: 'xs',
				class: 'mb-10',
				onClick: () => {
					this.setProps({
						...this.props,
						showDialog: 'addChat',
					});
				},
			}),
		});

		this.fetchChats();
	}

	async fetchChats() {
		try {
			const contacts = await chatServices.getChats();
			this.setProps({
				...this.props,
				contacts,
			});
			this.children.ListContacts.setProps({
				contacts,
			});
		} catch (error) {
			console.error('Ошибка загрузки чатов:', error);
		}
	}

	/**
	 * Подключаемся к чату по WebSocket
	 */
	async chatConnect({ userId, chatId, token }:{ userId: number, chatId: number, token:string }) {
		if (!userId || !chatId || !token) return;

		const socket = new WSTransport(
			`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
		);

		// Тут получаем и пихаем сообщения в чат
		socket.on('open', () => {
			socket.send({
				content: '0',
				type: 'get old',
			});
		});

		socket.on('message', (data) => {
			console.log('Новое сообщение:', data);
		});

		socket.on('close', (event) => {
			console.log('Соединение закрыто:', event);
		});

		socket.on('error', (event) => {
			console.error('Ошибка WebSocket:', event);
		});
	}

	public render(): string {
		return `
		<section class="chat">
			<aside class="chat__list">
				{{{ SettingsButton }}}
				{{{ ChatSearch }}}
				{{{ AddChat }}}
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
			{{{ DialogRemove }}}
		{{/if}}

		{{#if (eq showDialog "add") }}
			{{{ DialogAdd }}}
		{{/if}}
		
		{{#if (eq showDialog "addChat") }}
			{{{ DialogAddChat }}}
		{{/if}}
    	`;
	}
}

const mapStateToProps = (state: AppState) => ({
	isLoading: state.isLoading,
	user: state.user,
});

export default connect(mapStateToProps)(ChatPage);
