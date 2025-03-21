import './style.scss';
import Handlebars from 'handlebars';
import '@/helpers/handlebars';
import { pages } from '@/data/pages';
import * as Pages from "./pages";
import Block from '@/core/block';
import * as Components from './components';
import renderDOM from './core/renderDom';

import Router from '@/core/Router';
import { ROUTER } from '@/constants';
import { Store, StoreEvents } from '@/core/Store';

import * as authServices from '@/services/auth';
import RegisterPage from './pages/register/register.ts';

Object.entries(Components).forEach(([name, template]) => {
	if (typeof template === 'function') {
		return;
	}
	Handlebars.registerPartial(name, template);
});

window.store = new Store({
	isLoading: false,
	user: null,
	loginError: null,
});

store.on(StoreEvents.Updated, (prevState, newState) => {
	console.log('prevState', prevState);
	console.log('newState', newState);
});

// authServices.checkLoginUser();

const APP_ROOT_ELEMNT = '#app';
window.router = new Router(APP_ROOT_ELEMNT);
window.router
	.use(ROUTER.login, Pages.LoginPage)
	.use(ROUTER.register, Pages.RegisterPage)
	.use(ROUTER.profile, Pages.ProfilePage)
	.use(ROUTER.chat, Pages.ChatPage)
	.use('*', Pages.NotFoundPage)
	.start();
