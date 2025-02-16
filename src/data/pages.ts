import { Pages } from '@/types/pages';
import * as PagesTemplates from '@/pages';
import avatar from '@/assets/icons/avatar.svg?raw';
import chatImg1 from '@/assets/01.webp';
import chatImg2 from '@/assets/02.webp';
import chatImg3 from '@/assets/03.webp';
import chatImg4 from '@/assets/04.webp';
import chatImg5 from '@/assets/05.webp';
import chatImg6 from '@/assets/06.webp';
import chatImg7 from '@/assets/07.webp';
import chatImg8 from '@/assets/08.webp';
import chatImg9 from '@/assets/09.webp';

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
		context: { img: avatar, chatImg1, showDialog: 'false' },
	},
	chat: {
		name: 'Чат',
		template: PagesTemplates.ChatPage,
		context: {
			conversationDate: '19 июня',
			activeChatImg: chatImg4,
			contacts: [
				{
					name: 'Андрей',
					avatar: chatImg1,
					date: '10:49',
					unread: 2,
					text: 'изображение',
				},
				{
					name: 'Киноклуб',
					avatar: chatImg2,
					date: '12:00',
					you: true,
					text: 'стикер',
				},
				{
					name: 'Илья',
					avatar: chatImg3,
					date: '15:12',
					unread: 4,
					text: 'В своём стремлении улучшить пользовательский опыт мы упускаем, что представители современных социальных резервов являются только методом политического участия и объективно рассмотрены соответствующими инстанциями.',
				},
				{
					name: 'Вадим',
					avatar: chatImg4,
					date: 'Пт',
					you: true,
					active: true,
					text: 'Предварительные выводы неутешительны: семантический разбор внешних противодействий говорит',
				},
				{
					name: 'тет-а-теты',
					avatar: chatImg5,
					date: 'Ср',
					text: 'И Human Interface Guidelines и Material Design рекомендуют...',
				},
				{
					name: '1, 2, 3',
					avatar: chatImg6,
					date: 'Пн',
					text: 'Миллионы россиян ежедневно проводят десятки часов свое...',
				},
				{
					name: 'Design Destroyer',
					avatar: chatImg7,
					date: 'Пн',
					text: 'В 2008 году художник Jon Rafman начал собирать...',
				},
				{
					name: 'Day.',
					avatar: chatImg8,
					date: '1 Мая 2020',
					text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
				},
				{
					name: 'Стас Рогозин',
					avatar: chatImg9,
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
