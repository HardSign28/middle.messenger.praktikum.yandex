export function formatDateChatList(inputDate: string): string | undefined {
	if (!inputDate) return undefined;
	const date = new Date(inputDate); // Парсим дату из строки
	const now = new Date(); // Текущая дата в локальном часовом поясе

	// Приводим обе даты к одной временной зоне
	const diffInMs = now.getTime() - date.getTime();
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

	const isYesterday = now.getDate() - date.getDate() === 1 && diffInMinutes >= 1440;
	const isSameDay = now.getDate() === date.getDate();

	if (diffInMinutes < 1) {
		return 'только что';
	} if (diffInMinutes < 60) {
		return `${diffInMinutes} мин`;
	} if (isSameDay) {
		return `${Math.floor(diffInMinutes / 60)}ч назад`;
	} if (isYesterday) {
		return 'вчера';
	}
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	return `${day}.${month}`;
}

export function formatDateChatMessage(inputDate: string): string | undefined {
	if (!inputDate) return undefined;
	const localDate = new Date(inputDate);

	const hours = localDate.getHours().toString().padStart(2, '0');
	const minutes = localDate.getMinutes().toString().padStart(2, '0');

	return `${hours}:${minutes}`;
}
