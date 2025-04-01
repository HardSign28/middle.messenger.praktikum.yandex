import {
	Button,
	ChatFooter,
	ChatHeader,
	ChatMessages,
	ChatSearch,
	DialogAdd,
	DialogAddChat,
	DialogChatUsers,
	DialogRemove,
	DialogRemoveChat,
	ListContacts,
} from '@/components';
import { groupMessages } from '@/utils/groupMessages';
import Block from '@/core/block';
import {
	ChatPageProps,
	Contact,
	CreateChatData,
	Message,
} from '@/types/chat';
import { ROUTER } from '@/constants';
import * as chatServices from '@/services/chat';
import { WSTransport } from '@/core/ws';
import { connect } from '@/utils/connect';

class ChatPage extends Block {
	private socket: WSTransport | null = null;

	constructor(props: Partial<ChatPageProps>) {
		super('main', {
			...props,
			className: 'page-chat',
			contacts: [],
			messages: [],
			activeContactIndex: -1,
			hasActiveContact: false,
			showDialog: null,
			selectedChatId: null,
			ChatSearch: new ChatSearch({
				label: 'Поиск',
				type: 'outline-primary',
				onChange: (e) => {
					const { value } = e.target as HTMLInputElement;
					const searchTerm = value.toLowerCase();
					const filtered = (this.props.contacts as Contact[]).filter(
						(contact) => contact.title.toLowerCase().includes(searchTerm),
					);

					(this.children.ListContacts as Block).setProps({
						contacts: filtered,
					});
				},
			}),

			ChatHeader: new ChatHeader({
				onUserAddClick: () => {
					this.setProps({
						...this.props,
						showDialog: 'DialogAdd',
					});
				},
				onUserDeleteChatClick: (chatId) => {
					if (chatId) {
						const chatName = (this.props.contacts as Record<string, unknown>[])
							.find((chat) => chat.id === chatId)?.title ?? null;
						(((this.children.DialogDeleteChat as Block).children.Dialog as Block)
							.children.Body as Block)
							.setProps({
								chatId,
								chatName,
							});
						this.setProps({
							...this.props,
							showDialog: 'DialogDeleteChat',
						});
					} else {
						window.store.setAlertMessage({
							status: 'error',
							message: 'Не удалось удалить чат',
						});
					}
				},
				onShowDialogChatUsers: () => {
					const chatUsers = (this.children.ChatHeader as Block)
						.props.chatUsers as Record<string, unknown>[];

					(((this.children.DialogChatUsers as Block).children.Dialog as Block)
						.children.Body as Block).setProps({
						chatUsers,
					});

					this.setProps({
						...this.props,
						showDialog: 'DialogChatUsers',
					});
				},
			}),
			ChatFooter: new ChatFooter({
				onSendButtonClick: (message: string) => {
					this.sendMessage(message);
					// Очищаем поле ввода при успешной отправке
					const chatFooter = this.children.ChatFooter as Block;
					(chatFooter.children.Input as Block).setProps({
						value: '',
					});
				},
			}),
			ChatMessages: new ChatMessages({ id: 'js_chatMessages' }),
			ListContacts: new ListContacts({
				onSelectContact: async (index) => {
					if (index === this.props.activeContactIndex) return;

					const selectedContact = (this.props.contacts as Contact[] | undefined)?.[index];
					const selectedContactName = selectedContact?.title;
					const chatId = Number(selectedContact?.id);

					const user = this.props?.user as { id: number };
					const userId = user?.id;
					const chatConnectData = {
						userId,
						chatId,
						token: '',
					};

					// Получаем токен для чата
					await this.getToken(chatConnectData, chatId);

					// Получаем список участников чата
					await this.getChatUsers(chatId);

					// Подключаемся к чату по WS
					await this.chatConnect(chatConnectData);

					this.setProps({
						...this.props,
						activeContactIndex: index,
						hasActiveContact: index >= 0,
						messages: [],
					});

					(this.children.ChatHeader as Block).setProps({
						name: selectedContactName,
						activeChatImg: (this.props.contacts as Contact[] | undefined)?.[index]?.avatar,
					});
				},
			}),
			DialogRemove: new DialogRemove({
				onOk: async (userId: number) => {
					if (!userId) return;
					// Удаляем пользователя из чата
					const deleteUserData = {
						users: [userId],
						chatId: this.props.selectedChatId,
					};
					await chatServices.deleteChatUsers(deleteUserData);
					const chatUsers = await chatServices.getChatUsers(Number(this.props.selectedChatId));
					(this.children.ChatHeader as Block).setProps({
						chatUsers,
					});
					this.setProps({
						...this.props,
						showDialog: null,
					});
				},
				onCancel: () => {
					this.setProps({
						...this.props,
						showDialog: 'DialogChatUsers',
					});
				},
			}),
			DialogAdd: new DialogAdd({
				onOk: async (userId: number) => {
					const chatId = Number(this.props.selectedChatId);
					const addUserData = {
						users: [userId],
						chatId,
					};

					await chatServices.addChatUsers(addUserData);
					// const chatUsers = await chatServices.getChatUsers(Number(this.props.selectedChatId));

					await this.getChatUsers(chatId);

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
						await chatServices.createChat(formData as CreateChatData);
						await this.fetchChats();
						this.setProps({
							...this.props,
							showDialog: null,
						});
					} catch (error) {
						throw new Error(`Ошибка Создания чата: ${error}}`);
					}
				},
				onCancel: () => {
					this.setProps({
						...this.props,
						showDialog: null,
					});
				},
			}),
			DialogDeleteChat: new DialogRemoveChat({
				onOk: async (chatId: number) => {
					if (!chatId) return;
					// Удаляем чат
					await chatServices.deleteChat(chatId);
					await this.fetchChats();
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
			DialogChatUsers: new DialogChatUsers({
				onOk: (userId: number) => {
					const userName = (this.props.chatUsers as Record<string, unknown>[])
						.find((user: Record<string, unknown>) => user.id === userId)?.first_name ?? null;
					(((this.children.DialogRemove as Block).children.Dialog as Block)
						.children.Body as Block).setProps({
						userId,
						userName,
					});
					this.setProps({
						...this.props,
						showDialog: 'DialogRemove',
					});
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
				class: 'mb-10 mt-10',
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

	/**
	 * Получаем список чатов
	 */
	async fetchChats() {
		try {
			const contacts = await chatServices.getChats();
			this.setProps({
				...this.props,
				contacts,
			});
			(this.children.ListContacts as Block).setProps({
				contacts,
			});
		} catch (error) {
			throw new Error(`Ошибка загрузки чатов: ${error}}`);
		}
	}

	/**
	 * Получаем токен чата
	 * @param chatConnectData
	 * @param chatId
	 */
	async getToken(chatConnectData: Record<string, unknown>, chatId: number) {
		try {
			const response = await chatServices.getChatToken(chatId);
			if ('token' in response) {
				const { token } = response;
				chatConnectData.token = token;
			} else {
				throw new Error(`Ошибка при получении токена: ${response}`);
			}
		} catch (error) {
			throw new Error(`Ошибка getChatToken: ${error}}`);
		}
	}

	/**
	 * Получаем список участников чата
	 * @param chatId
	 */
	async getChatUsers(chatId: number) {
		try {
			const chatUsers = await chatServices.getChatUsers(chatId);
			(this.children.ChatHeader as Block).setProps({
				chatUsers,
				chatId,
			});
			this.setProps({
				chatUsers,
			});
			window.store.set({ chatUsers });
		} catch (error) {
			throw new Error(`Ошибка getChatUsers: ${error}}`);
		}
	}

	/**
	 * Скролл чата в низ к последнему сообщению
	 */
	scrollChatToBottom() {
		const chatMessages = document.getElementById('js_chatMessages');
		if (chatMessages) {
			chatMessages.scrollTop = chatMessages.scrollHeight;
		}
	}

	/**
	 * Подключаемся к чату по WebSocket
	 */
	async chatConnect({ userId, chatId, token }:{ userId: number, chatId: number, token:string }) {
		if (!userId || !chatId || !token) return;

		this.setProps({
			...this.props,
			selectedChatId: chatId,
		});

		this.socket = new WSTransport(
			`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
		);

		// Тут получаем и пихаем сообщения в чат
		this.socket.on('open', () => {
			this.socket?.send({
				content: '0',
				type: 'get old',
			});
		});

		this.socket.on('message', async (data) => {
			// await this.fetchChats(); // Скачет чат

			let newMessage;
			try {
				newMessage = JSON.parse(data as string);
			} catch (error) {
				newMessage = null;
				throw new Error(`Ошибка парсинга JSON: ${error}`);
			}

			if (!Array.isArray(newMessage) && newMessage?.type !== 'message') return;

			this.setProps({
				...this.props,
				messages: [
					...(this.props?.messages || []) as Message[],
					...(Array.isArray(newMessage) ? newMessage : [newMessage]),
				],
			});

			(this.children.ChatMessages as Block).setProps({
				chatGroups: groupMessages((this.props?.messages as Message[]), userId),
			});

			this.scrollChatToBottom();

			// Ставим фокус на поле ввода
			if (this.element) {
				(this.element.querySelector('#message') as HTMLInputElement).focus();
			}
		});

		this.socket.on('close', (event) => {
			throw new Error(`Ошибка getChatToken: ${event}}`);
		});

		this.socket.on('error', (event) => {
			throw new Error(`Ошибка WebSocket: ${event}}`);
		});
	}

	sendMessage(message: string) {
		if (!this.socket) {
			throw new Error('Соединение WebSocket не установлено. Невозможно отправить сообщение.');
		}

		this.socket.send({
			content: message,
			type: 'message',
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
					{{{ ChatMessages }}}
					{{{ ChatFooter }}}
				{{ else }}
					<div class="chat__content-empty">Выберите чат, чтобы отправить сообщение</div>
				{{/if}}
			</section>
		</section>
		{{#if (eq showDialog "DialogRemove") }}
			{{{ DialogRemove }}}
		{{/if}}
		{{#if (eq showDialog "DialogAdd") }}
			{{{ DialogAdd }}}
		{{/if}}
		{{#if (eq showDialog "addChat") }}
			{{{ DialogAddChat }}}
		{{/if}}
		{{#if (eq showDialog "DialogDeleteChat") }}
			{{{ DialogDeleteChat }}}
		{{/if}}
		{{#if (eq showDialog "DialogChatUsers") }}
			{{{ DialogChatUsers }}}
		{{/if}}
    	`;
	}
}

const mapStateToProps = (state: Record<string, unknown>) => ({
	isLoading: state.isLoading,
	user: state.user,
});

export default connect(mapStateToProps)(ChatPage);
