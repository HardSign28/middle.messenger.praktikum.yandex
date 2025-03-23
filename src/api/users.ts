import { HTTPTransport } from '@/core/http';
import {
	APIError,
} from './type';

const usersApi = new HTTPTransport('/user');

export default class UsersApi {
	async changeProfile(data: Record<string, string>): Promise<void | APIError> {
		return usersApi.put('/profile', { data });
	}
}
