import { messages } from '@/data/messages';

export function generateContacts() {
	const contactMap = new Map<string, { lastMessage: string; date: string; unread: number }>();

	messages.forEach((msg) => {
		const {
			chatId,
			name,
			text,
			time,
			sender,
			seen,
		} = msg;

		const existing = contactMap.get(name) || {
			lastMessage: '',
			date: '',
			unread: 0,
			chatId,
			you: false,
		};

		// Обновляем последнее сообщение
		existing.lastMessage = text;
		existing.date = time;
		existing.you = sender === 'me';

		// Если сообщение от собеседника и не прочитано нами — увеличиваем счетчик
		if (sender === 'other' && !seen) {
			existing.unread += 1;
		}

		contactMap.set(name, existing);
	});

	// Преобразуем в массив объектов
	return Array.from(contactMap.entries()).map(([name, data]) => ({
		name,
		avatar: `/avatars/0${data.chatId}.webp`, // ||  chatImgPlaceholder, // Можно подтягивать из API
		date: data.date,
		unread: data.unread > 0 ? data.unread : undefined, // Не показываем 0
		text: data.lastMessage,
		you: data.you,
	}));
}
