import { Pages } from '@/types/pages';
import * as PagesTemplates from '@/pages';
import avatar from '@/assets/icons/avatar.svg?raw';
import cat1 from '@/assets/01.jpg';
import cat2 from '@/assets/02.jpg';
import cat3 from '@/assets/03.jpg';
import img404 from '@/assets/icons/404.webp';
import img500 from '@/assets/icons/500.webp';
import { messages } from '@/data/messages';
import { groupMessages } from '@/utils/groupMessages';

const chatGroups = groupMessages(messages);
export const pages: Pages = {
	login: { name: 'Логин', template: PagesTemplates.LoginPage },
	register: { name: 'Регистрация', template: PagesTemplates.RegisterPage },
	profile: {
		name: 'Профиль',
		template: PagesTemplates.ProfilePage,
		context: { img: avatar, cat1, showDialog: 'false' },
	},
	chat: {
		name: 'Чат',
		template: PagesTemplates.ChatPage,
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
			showDialog: 'false',
		},
	},
	404: {
		name: '404 Страница не найдена',
		context: { img404 },
		template: PagesTemplates.NotFoundPage,
	},
	500: {
		name: '500 Ошибка сервера',
		context: { img500 },
		template: PagesTemplates.ServerErrorPage,
	},
	nav: { name: 'Навигация', template: PagesTemplates.NavigatePage },
};
