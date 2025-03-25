import ChatApi from '@/api/chat';

const chatApi = new ChatApi();

export const getChats = async () => {
	window.store.set({ isLoading: true });
	try {
		return await chatApi.getChats();
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ getChats: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const createChat = async (data) => {
	window.store.set({ isLoading: true });
	try {
		return await chatApi.createChat(data);
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ createChat: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const getChatToken = async (id: number) => {
	window.store.set({ isLoading: true });
	try {
		return await chatApi.getChatToken(id);
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ getChatToken: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const getChatUsers = async (id: number) => {
	window.store.set({ isLoading: true });
	try {
		return await chatApi.getChatUsers(id);
	} catch (responseError) {
		const { data } = responseError;
		window.store.set({ getChats: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};
