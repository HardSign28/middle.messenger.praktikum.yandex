import { Message, MessageGroup } from '@/types/chat';
import { formatDateByDay, formatDateChatMessage } from '@/utils/formatDate';

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

	const messagesCopy = [...messages].map((msg) => ({ ...msg }));
	messagesCopy.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

	messagesCopy.forEach((msg) => {
		const msgTime = new Date(msg.time);
		const dateKey = formatDateByDay(msgTime);
		const prevTime = currentGroup
			? new Date(currentGroup.messages[currentGroup.messages.length - 1].rawTime)
			: null;

		const sender = userId === msg.user_id ? 'me' : 'other';

		if (!groupedByDate[dateKey]) {
			groupedByDate[dateKey] = [];
			currentGroup = null;
		}

		if (
			!currentGroup
			|| currentGroup.sender !== sender
			|| (prevTime
				&& (msgTime.getTime() - prevTime.getTime()) / 60000 > timeThreshold)
		) {
			currentGroup = { sender, messages: [] };
			groupedByDate[dateKey].push(currentGroup);
		}

		const formattedMessage = {
			...msg,
			sender: sender as 'me' | 'other',
			time: formatDateChatMessage(msg.time) || '',
			rawTime: msg.time,
			content: msg.content,
		};

		currentGroup.messages.push(formattedMessage);
	});

	return groupedByDate;
};
