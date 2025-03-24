import ChatApi from '@/api/chat';

const chatApi = new ChatApi();

export const getChats = async () => {
	window.store.set({ isLoading: true });
	try {
		return await chatApi.getChats();
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ loginError: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const createChat = async (data) => {
	window.store.set({ isLoading: true });
	try {
		await chatApi.createChat(data);
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ loginError: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};
