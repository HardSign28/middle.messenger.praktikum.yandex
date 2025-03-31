export function formatDateChatList(inputDate: string): string | undefined {
	if (!inputDate) return undefined;
	const date = new Date(inputDate);
	const now = new Date();

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

export function formatDateByDay(date: string | Date): string {
	const msgDate = new Date(date);
	const now = new Date();

	const isToday =
		msgDate.getDate() === now.getDate() &&
		msgDate.getMonth() === now.getMonth() &&
		msgDate.getFullYear() === now.getFullYear();

	if (isToday) return 'сегодня';

	const months = [
		'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
		'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
	];

	const day = msgDate.getDate();
	const month = months[msgDate.getMonth()];
	const year = msgDate.getFullYear();

	if (year < now.getFullYear()) {
		return `${day.toString().padStart(2, '0')}.${(msgDate.getMonth() + 1)
			.toString()
			.padStart(2, '0')}.${year}`;
	}

	return `${day} ${month}`;
}
