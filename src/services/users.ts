import UsersApi from '@/api/users';
import { PasswordModelType, ProfileModelType } from '@/types/api';

const usersApi = new UsersApi();

export const changeProfile = async (model: ProfileModelType) => {
	window.store.set({ isLoading: true });
	try {
		await usersApi.changeProfile(model);
	} catch (responseError) {
		const { data } = responseError as { data: { reason: string } };
		window.store.set({ loginError: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const changeAvatar = async (file: FormData) => {
	window.store.set({ isLoading: true });
	try {
		return await usersApi.changeAvatar(file);
	} catch (responseError) {
		const { data } = responseError as { data: { reason: string } };
		window.store.set({ changeAvatarError: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const changePassword = async (model: PasswordModelType) => {
	window.store.set({ isLoading: true });
	try {
		return await usersApi.changePassword(model);
	} catch (responseError) {
		const { data } = responseError as { data: { reason: string } };
		window.store.set({ changePasswordError: data?.reason || 'Произошла ошибка' });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const findChatUser = async (login: Record<string, string>) => {
	if (!login) return undefined;
	window.store.set({ isLoading: true });
	try {
		return await usersApi.findChatUser(login);
	} catch (responseError) {
		const { data } = responseError as { data: { reason: string } };
		window.store.set({ deleteChatError: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};
