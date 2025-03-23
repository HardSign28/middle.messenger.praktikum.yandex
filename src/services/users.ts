import UsersApi from '@/api/users';

const usersApi = new UsersApi();

export const changeProfile = async (model) => {
	window.store.set({ isLoading: true });
	try {
		await usersApi.changeProfile(model);
	} catch (responsError) {
		const error = await responsError.json();
		window.store.set({ loginError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};
