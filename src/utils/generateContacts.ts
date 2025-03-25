export function generateContacts(messages) {
	const contactMap = new Map<string, {
		last_message: string;
		date: string;
		unread_count: number,
		id: number,
		avatar: string,
		you: boolean,
	}>();

	messages.forEach((msg) => {
		const {
			id,
			title,
			text,
			time,
			sender,
			seen,
		} = msg;

		const existing = contactMap.get(title) || {
			lastMessage: '',
			date: '',
			unread: 0,
			id,
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

		contactMap.set(title, existing);
	});

	// Преобразуем в массив объектов
	return Array.from(contactMap.entries()).map(([title, data]) => ({
		title,
		avatar: data.avatar,
		date: data.date,
		unread: data.unread_count + 1,
		text: data.last_message,
		you: data.you,
	}));
}
