import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './style.scss';

import cat1 from '@/assets/01.jpg';
import cat2 from '@/assets/02.jpg';
import cat3 from '@/assets/03.jpg';
import avatar from '@/assets/icons/avatar.svg?raw';

import img404 from '@/assets/icons/404.webp';
import img500 from '@/assets/icons/500.webp';


type Message = {
	sender: 'me' | 'other';
	text: string;
	time: string;
	seen?: boolean;
	img?: boolean;
};

type MessageGroup = {
	sender: 'me' | 'other';
	messages: Message[];
};

Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('defaultAvatar', () => avatar);
const messages: Message[] = [
	{ sender: "other",
		text: `<p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p>
				<p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>`,
		time: "11:56" },
	{ sender: "other",
		img: true,
		text: `<img class="chat__attach-img" src="/chat-attach.png" width="316" height="211" alt="Вложенное изображение">`,
		time: "11:56" },
	{ sender: "me", text: "Салам!", time: "11:59", seen: true },
	{ sender: "me", text: "Круто!", time: "12:00", seen: true },
	{ sender: "other", text: "Я знал, что ты оценишь!", time: "12:00" },
	{ sender: "me", text: "Еще время надо добавить", time: "12:01", seen: true },
	{ sender: "me", text: "И дату", time: "12:01", seen: true },
	{ sender: "other", text: "И всплывахи", time: "12:03" },
	{ sender: "me", text: "Поездато!", time: "12:03", seen: true },
	{ sender: "me", text: "Предварительные выводы неутешительны: семантический разбор внешних противодействий говорит о возможностях первоочередных требований. Внезапно, ключевые особенности структуры проекта представлены в исключительно положительном свете. Противоположная точка зрения подразумевает, что сделанные на базе интернет-аналитики выводы ограничены исключительно образом мышления!!", time: "13:04", seen: true },
];
const chatGroups = groupMessages(messages);
const pages: Record<
	string,
	{ name: string; template: string; context?: Record<string, unknown> }
> = {
	login: { name: 'Логин', template: Pages.LoginPage },
	register: { name: 'Регистрация', template: Pages.RegisterPage },
	profile: {
		name: 'Профиль',
		template: Pages.ProfilePage,
		context: { img: avatar, cat1, showDialog: "false" },
	},
	chat: {
		name: 'Чат',
		template: Pages.ChatPage,
		context: {
			conversationDate: '19 июня',
			contacts: [
				{
					name: 'Андрей',
					avatar: cat1,
					date: '10:49',
					unread: 2,
					text: 'изображение',
				},
				{
					name: 'Киноклуб',
					avatar: cat2,
					date: '12:00',
					you: true,
					text: 'стикер',
				},
				{
					name: 'Илья',
					avatar: cat3,
					date: '15:12',
					unread: 4,
					text: 'В своём стремлении улучшить пользовательский опыт мы упускаем, что представители современных социальных резервов являются только методом политического участия и объективно рассмотрены соответствующими инстанциями.',
				},
				{
					name: 'Вадим',
					avatar: cat2,
					date: 'Пт',
					you: true,
					active: true,
					text: 'Круто!',
				},
				{
					name: 'тет-а-теты',
					avatar: cat2,
					date: 'Ср',
					text: 'И Human Interface Guidelines и Material Design рекомендуют...',
				},
				{
					name: '1, 2, 3',
					avatar: cat2,
					date: 'Пн',
					text: 'Миллионы россиян ежедневно проводят десятки часов свое...',
				},
				{
					name: 'Design Destroyer',
					avatar: cat2,
					date: 'Пн',
					text: 'В 2008 году художник Jon Rafman начал собирать...',
				},
				{
					name: 'Day.',
					avatar: cat2,
					date: '1 Мая 2020',
					text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
				},
				{
					name: 'Стас Рогозин',
					avatar: cat2,
					date: '12 Апр 2020',
					text: 'Можно или сегодня или завтра вечером.',
				},
			],
			chatGroups,
			showDialog: "false",
		},
	},
	404: {
		name: '404 Страница не найдена',
		context: { img404 },
		template: Pages.NotFoundPage,
	},
	500: {
		name: '500 Ошибка сервера',
		context: { img500 },
		template: Pages.ServerErrorPage,
	},
	nav: { name: 'Навигация', template: Pages.NavigatePage },
};
Object.entries(Components).forEach(([name, template]) => {
	Handlebars.registerPartial(name, template);
});

/**
 * Навигация по страницам
 * @param page
 */
function navigate(page: keyof typeof pages) {
	const { template, context, name } = pages[page];
	const container = document.getElementById('app')!;
	const fullContext = { ...context, pages, currentPage: name };
	const templatingFunction = Handlebars.compile(template);
	container.innerHTML = templatingFunction(fullContext);
}

/**
 * Группирует сообщения по отправителю и времени
 * Если новая группа или превышен лимит времени — создаем новую
 * @param messages
 * @param timeThreshold
 */
function groupMessages(messages: Message[], timeThreshold: number = 10): MessageGroup[] {
	const grouped: MessageGroup[] = [];
	let currentGroup: MessageGroup | null = null;

	messages.forEach((msg) => {
		const msgTime = new Date(`2000-01-01T${msg.time}:00`);
		const prevTime = currentGroup ? new Date(`2000-01-01T${currentGroup.messages.at(-1)!.time}:00`) : null;

		if (!currentGroup || currentGroup.sender !== msg.sender || (prevTime && (msgTime.getTime() - prevTime.getTime()) / 60000 > timeThreshold)) {
			currentGroup = { sender: msg.sender, messages: [] };
			grouped.push(currentGroup);
		}

		currentGroup.messages.push(msg);
	});

	return grouped;
}

document.addEventListener('DOMContentLoaded', () => navigate('chat'));
document.addEventListener('click', (e) => {
	const target = e.target as HTMLElement | null;

	if (target && target.hasAttribute('page')) {
		const page = target.getAttribute('page') as keyof typeof pages;

		navigate(page);

		e.preventDefault();
		e.stopImmediatePropagation();
	}
});
