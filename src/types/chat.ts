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
