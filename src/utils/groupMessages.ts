import { Message, MessageGroup } from '@/types/chat';
import { formatDateChatList, formatDateChatMessage } from '@/utils/formatDate';

function escapeHTML(input: string): string {
	return input
		.replace(/&/g, '&amp;') // Экранирует &
		.replace(/</g, '&lt;') // Экранирует <
		.replace(/>/g, '&gt;') // Экранирует >
		.replace(/"/g, '&quot;') // Экранирует "
		.replace(/'/g, '&#039;'); // Экранирует '
}

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

	// Создаем копию сообщений, чтобы избежать мутаций
	const messagesCopy = [...messages].map((msg) => ({ ...msg }));

	// Сортируем сообщения по времени (от более ранних к более поздним)
	messagesCopy.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

	messagesCopy.forEach((msg) => {
		const msgTime = new Date(msg.time);
		const dateKey = formatDateChatList(msgTime.toISOString().split('T')[0]); // Формат: YYYY-MM-DD
		const prevTime = currentGroup
			? new Date(currentGroup.messages[currentGroup.messages.length - 1].time)
			: null;

		// Добавляем информацию о sender без изменения исходного сообщения
		const sender = userId === msg.user_id ? 'me' : 'other';

		// Если новая дата, создаем новый список групп для этой даты
		if (!groupedByDate[dateKey]) {
			groupedByDate[dateKey] = [];
			currentGroup = null; // Обнуляем текущую группу
		}

		// Проверяем условия для начала новой группы
		if (
			!currentGroup ||
			currentGroup.sender !== sender ||
			(prevTime &&
				(msgTime.getTime() - prevTime.getTime()) / 60000 > timeThreshold)
		) {
			// Создаем новую группу сообщений
			currentGroup = { sender, messages: [] };
			groupedByDate[dateKey].push(currentGroup);
		}

		// Форматируем время сообщения
		const formattedMessage = {
			...msg,
			sender,
			time: formatDateChatMessage(msg.time),
			content: escapeHTML(msg.content), // Экранирование текста сообщения
		};

		// Добавляем сообщение в текущую группу
		currentGroup.messages.push(formattedMessage);
	});

	return groupedByDate;
};
