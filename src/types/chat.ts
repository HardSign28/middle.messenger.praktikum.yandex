import { groupMessages } from '@/utils/groupMessages';

export type Message = {
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
	onUserAddClick?: () => void;
	onUserDeleteClick?: () => void;
	activeChatImg?: string;
	name?: string;
}

export type ChatMessagesProps = {
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
	name: string;
	avatar?: string;
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
	contacts?: object[];
	onSelectContact?: (index: number) => void;
}
