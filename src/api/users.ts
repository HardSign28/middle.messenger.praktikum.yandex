import { HTTPTransport } from '@/core/http';
import { PasswordModel, ProfileModel } from '@/types/api';
import {
	APIError,
} from './type';

const usersApi = new HTTPTransport('/user');

export default class UsersApi {
	async changeProfile(data: ProfileModel): Promise<void | APIError> {
		return usersApi.put('/profile', { data });
	}

	async changeAvatar(data: FormData): Promise<void | APIError> {
		return usersApi.put('/profile/avatar', { data });
	}

	async changePassword(data: PasswordModel): Promise<void | APIError> {
		return usersApi.put('/password', { data });
	}
}
