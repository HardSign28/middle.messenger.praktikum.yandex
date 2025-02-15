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

Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('defaultAvatar', () => avatar);

const pages: Record<
	string,
	{ name: string; template: string; context?: Record<string, unknown> }
> = {
	login: { name: 'Логин', template: Pages.LoginPage },
	register: { name: 'Регистрация', template: Pages.RegisterPage },
	profile: {
		name: 'Профиль',
		template: Pages.ProfilePage,
		context: { img: avatar, cat1 },
	},
	chat: {
		name: 'Чат',
		template: Pages.ChatPage,
		context: {
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
			showDialog: false,
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

function navigate(page: keyof typeof pages) {
	const { template, context, name } = pages[page];
	const container = document.getElementById('app')!;

	// Добавляем список страниц в контекст, включая их имена
	const fullContext = { ...context, pages, currentPage: name };

	const templatingFunction = Handlebars.compile(template);
	container.innerHTML = templatingFunction(fullContext);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e) => {
	const target = e.target as HTMLElement | null;

	if (target && target.hasAttribute('page')) {
		const page = target.getAttribute('page') as keyof typeof pages;

		navigate(page);

		e.preventDefault();
		e.stopImmediatePropagation();
	}
});
