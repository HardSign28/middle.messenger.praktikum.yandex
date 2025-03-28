import ChatApi from '@/api/chat';
import { CreateChatData } from '@/types/chat';

const chatApi = new ChatApi();

export const getChats = async () => {
	window.store.set({ isLoading: true });
	try {
		return await chatApi.getChats();
	} catch (responseError) {
		const { data } = responseError as { data: { reason: string } };
		window.store.set({ getChats: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const createChat = async (createChatData: CreateChatData) => {
	window.store.set({ isLoading: true });
	try {
		return await chatApi.createChat(createChatData);
	} catch (responseError) {
		const { data } = responseError as { data: { reason: string } };
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
		const { data } = responseError as { data: { reason: string } };
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
		const { data } = responseError as { data: { reason: string } };
		window.store.set({ getChats: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const deleteChat = async (chatId: number) => {
	if (!chatId) return undefined;
	window.store.set({ isLoading: true });
	try {
		return await chatApi.deleteChat({ chatId });
	} catch (responseError) {
		const { data } = responseError as { data: { reason: string } };
		window.store.set({ deleteChatError: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const findChatUser = async (login: string) => {
	if (!login) return undefined;
	window.store.set({ isLoading: true });
	try {
		return await chatApi.findChatUser({ login });
	} catch (responseError) {
		const { data } = responseError as { data: { reason: string } };
		window.store.set({ deleteChatError: data?.reason });
		throw responseError;
	} finally {
		window.store.set({ isLoading: false });
	}
};
