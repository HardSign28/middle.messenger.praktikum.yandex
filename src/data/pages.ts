import { Pages } from '@/types/pages';
import * as PagesTemplates from '@/pages';
import avatar from '@/assets/icons/avatar.svg?raw';
import chatImg1 from '../../public/avatars/01.webp';

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
	},
	404: {
		name: '404 Страница не найдена',
		template: PagesTemplates.NotFoundPage,
	},
	500: {
		name: '500 Ошибка сервера',
		template: PagesTemplates.ServerErrorPage,
	},
	nav: { name: 'Навигация', template: PagesTemplates.NavigatePage },
};
