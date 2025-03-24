import UsersApi from '@/api/users';

const usersApi = new UsersApi();

export const changeProfile = async (model) => {
	window.store.set({ isLoading: true });
	try {
		await usersApi.changeProfile(model);
	} catch (responseError) {
		const error = await responseError.json();
		window.store.set({ loginError: error.reason });
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
		const error = await responseError.json();
		window.store.set({ changeAvatarError: error.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const changePassword = async (model) => {
	window.store.set({ isLoading: true });
	try {
		return await usersApi.changePassword(model);
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ changePasswordError: data?.reason || 'Произошла ошибка' });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};
