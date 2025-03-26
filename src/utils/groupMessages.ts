import { Message, MessageGroup } from '@/types/chat';
import { formatDateChatMessage } from '@/utils/formatDate';

/**
 * Группирует сообщения по дате, отправителю и времени.
 * Если новая дата, отправитель или превышен лимит времени — создаем новую группу.
 * @param messages
 * @param userId
 * @param timeThreshold
 */
export const groupMessages = (
	messages: Message[],
	userId: number,
	timeThreshold: number = 10,
): Record<string, MessageGroup[]> => {
	const groupedByDate: Record<string, MessageGroup[]> = {};
	let currentGroup: MessageGroup | null = null;

	// Сортируем сообщения по времени (от более ранних к более поздним)
	messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

	messages.forEach((msg) => {
		const msgTime = new Date(msg.time);
		const dateKey = msgTime.toISOString().split('T')[0]; // Формат: YYYY-MM-DD
		const prevTime = currentGroup
			? new Date(
				`2000-01-01T${currentGroup.messages[currentGroup.messages.length - 1].time}:00`,
			)
			: null;

		msg.sender = userId === msg.user_id ? 'me' : 'other';

		// Если новая дата, создаем новый список групп для этой даты
		if (!groupedByDate[dateKey]) {
			groupedByDate[dateKey] = [];
			currentGroup = null; // Обнуляем текущую группу
		}

		// Проверяем условия для начала новой группы
		if (
			!currentGroup ||
			currentGroup.sender !== msg.sender ||
			(prevTime &&
				(msgTime.getTime() - prevTime.getTime()) / 60000 > timeThreshold)
		) {
			// Создаем новую группу сообщений
			currentGroup = { sender: msg.sender, messages: [] };
			groupedByDate[dateKey].push(currentGroup);
		}

		// Форматируем время сообщения
		msg.time = formatDateChatMessage(msg.time);

		// Добавляем сообщение в текущую группу
		currentGroup.messages.push(msg);
	});

	return groupedByDate;
};
