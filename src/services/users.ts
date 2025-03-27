import UsersApi from '@/api/users';
import { PasswordModel, ProfileModel } from '@/types/api';

const usersApi = new UsersApi();

export const changeProfile = async (model: ProfileModel) => {
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

export const changePassword = async (model: PasswordModel) => {
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
