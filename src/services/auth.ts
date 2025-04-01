import { ROUTER } from '@/constants';
import AuthApi from '@/api/auth';
import { LoginModelType, RegisterModel, responseErrorType } from '@/types/api';

const authApi = new AuthApi();

export const login = async (model: LoginModelType) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.login(model);
		window.router.go(ROUTER.chat);
	} catch (responseError) {
		const { data } = responseError as responseErrorType;
		window.store.set({ loginError: data.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const register = async (model: RegisterModel) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.register(model);
		window.router.go(ROUTER.chat);
	} catch (responseError) {
		const { data } = responseError as responseErrorType;
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
		const { data } = responseError as { data: { reason: string } };
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
			window.router.go(ROUTER.chat);
		}
	} catch (responseError) {
		const { status } = responseError as responseErrorType;
		if (status === 401
			&& window.location.pathname !== ROUTER.register
			&& window.location.pathname !== ROUTER.login) {
			window.router.go(ROUTER.login);
		}
	} finally {
		window.store.set({ isLoading: false });
	}
};
