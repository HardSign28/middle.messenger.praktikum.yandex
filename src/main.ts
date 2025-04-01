import './style.scss';
import '@/helpers/handlebars';
import Router from '@/core/Router';
import { ROUTER } from '@/constants';
import { Store } from '@/core/Store';
import Block from '@/core/block';
import { Alert } from '@/components';
import * as Pages from './pages';

window.store = new Store({
	isLoading: false,
	user: null,
	loginError: null,
	changeAvatarError: null,
	changePasswordError: null,
	selectedFile: null,
});

const alert = new Alert({});
document.body.appendChild(alert.getContent()!);

const APP_ROOT_ELEMENT = '#app';
window.router = new Router(APP_ROOT_ELEMENT);
window.router
	.use(ROUTER.login, Pages.LoginPage as unknown as typeof Block)
	.use(ROUTER.register, Pages.RegisterPage as unknown as typeof Block)
	.use(ROUTER.profile, Pages.ProfilePage as unknown as typeof Block)
	.use(ROUTER.chat, Pages.ChatPage as unknown as typeof Block)
	.use(ROUTER.notFound, Pages.NotFoundPage as unknown as typeof Block)
	.start();
