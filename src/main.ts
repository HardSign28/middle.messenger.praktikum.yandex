import './style.scss';
import '@/helpers/handlebars';
import Router from '@/core/Router';
import { ROUTER } from '@/constants';
import { Store, StoreEvents } from '@/core/Store';
import * as authServices from '@/services/auth';
import * as Pages from './pages';

window.store = new Store({
	isLoading: false,
	user: null,
	loginError: null,
});

store.on(StoreEvents.Updated, (prevState, newState) => {
	if (prevState !== newState) {
		// console.log('prevState', prevState);
	}

	// console.log('prevState', prevState);
	// console.log('newState', newState);
});

authServices.checkLoginUser();

const APP_ROOT_ELEMNT = '#app';
window.router = new Router(APP_ROOT_ELEMNT);
window.router
	.use(ROUTER.login, Pages.LoginPage)
	.use(ROUTER.register, Pages.RegisterPage)
	.use(ROUTER.profile, Pages.ProfilePage)
	.use(ROUTER.chat, Pages.ChatPage)
	.use(ROUTER.notFound, Pages.NotFoundPage)
	.start();
