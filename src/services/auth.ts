import { ROUTER } from '@/constants';
import AuthApi from '@/api/auth';

const authApi = new AuthApi();

export const login = async (model) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.login(model);
		window.router.go(ROUTER.chat);
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ loginError: data.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const register = async (model) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.register(model);
		window.router.go(ROUTER.chat);
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ registerError: data?.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const logout = async () => {
	window.store.set({ isLoading: true });
	try {
		await authApi.logout();
		window.router.go(ROUTER.login);
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ registerError: data?.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const checkLoginUser = async () => {
	window.store.set({ isLoading: true });
	try {
		const user = await authApi.me();
		window.store.set({ user });
		if (window.location.pathname === ROUTER.login || window.location.pathname === ROUTER.register) {
			window.router.back();
		}
	} catch (responseError) {
		if (responseError?.status === 401 && window.location.pathname !== ROUTER.register) {
			window.router.go(ROUTER.login);
		}
	} finally {
		window.store.set({ isLoading: false });
	}
};
