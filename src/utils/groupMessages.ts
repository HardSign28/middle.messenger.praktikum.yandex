import { Message, MessageGroup } from "@/types/chat";

/**
 * Группирует сообщения по отправителю и времени
 * Если новая группа или превышен лимит времени — создаем новую
 * @param messages
 * @param timeThreshold
 */
export const groupMessages = (messages: Message[], timeThreshold: number = 10): MessageGroup[] => {
	const grouped: MessageGroup[] = [];
	let currentGroup: MessageGroup | null = null;

	messages.forEach((msg) => {
		const msgTime = new Date(`2000-01-01T${msg.time}:00`);
		const prevTime = currentGroup ? new Date(`2000-01-01T${currentGroup.messages[currentGroup.messages.length - 1].time}:00`) : null;

		if (!currentGroup || currentGroup.sender !== msg.sender || (prevTime && (msgTime.getTime() - prevTime.getTime()) / 60000 > timeThreshold)) {
			currentGroup = { sender: msg.sender, messages: [] };
			grouped.push(currentGroup);
		}

		currentGroup.messages.push(msg);
	});

	return grouped;
}
