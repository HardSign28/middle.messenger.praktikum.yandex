import { groupMessages } from '@/utils/groupMessages';

export type Message = {
	id: number;
	user_id: number;
	title: string;
	content: string;
	sender: 'me' | 'other';
	text: string;
	time: string;
	seen?: boolean;
	img?: boolean;
	chatId: number;
	name: string;
};

export type MessageGroup = {
	sender: 'me' | 'other';
	messages: Message[];
};

export type ChatHeaderProps = {
	onUserAddClick?: (login: string) => void;
	onUserDeleteClick?: () => void;
	onUserDeleteChatClick?: (chatId: number) => void;
	activeChatImg?: string;
	name?: string;
}

export type ChatMessagesProps = {
	id?: string;
	chatGroups?: [],
	messages?: [],
}

export type ChatSearchProps = {
	onChange?: (e: InputEvent) => void;
	label?: string;
	type?: string;
}

export type ContactCardProps = {
	avatar?: string;
	last_message?: {
		user?: Record<string, unknown>,
		time?: string,
	};
	onClick?: () => void;
}

export type Contact = {
	id: string; // Уникальный идентификатор контакта
	name: string; // Имя контакта
	avatarUrl?: string; // (опционально) URL аватара
	lastMessage?: string; // (опционально) Последнее сообщение
	title: string;
	avatar: string;
};

export type ChatPageProps = {
	contacts: Contact[];
	filteredContacts: Contact[];
	activeContactIndex: number;
	hasActiveContact: boolean;
	showDialog: string | null;
	activeContactMessages?: ReturnType<typeof groupMessages>;
};

export type ListContactsProps = {
	contacts?: Contact[]; // Массив контактов
	onSelectContact?: (index: number) => void;
}

export type CreateChatData = {
	title: string;
}
