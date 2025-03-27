import { HTTPTransport } from '@/core/http';
import {
	APIError,
} from './type';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
	async getChats(): Promise<void | APIError> {
		return chatApi.get('');
	}

	async createChat(data: Record<string, string>): Promise<void | APIError> {
		return chatApi.post('', { data });
	}

	async getChatToken(id: number): Promise<void | APIError> {
		return chatApi.post(`/token/${id}`, { id });
	}

	async getChatUsers(id: number): Promise<void | APIError> {
		return chatApi.get(`/${id}/users`);
	}

	async changePassword(data: Record<string, string>): Promise<void | APIError> {
		return chatApi.put('/password', { data });
	}
}
