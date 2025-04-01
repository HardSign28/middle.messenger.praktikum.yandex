import { HTTPTransport } from '@/core/http';
import { PasswordModelType, ProfileModelType } from '@/types/api';
import {
	APIError,
} from './type';

type ChangeAvatarResponse = {
	avatar: string;
};

const usersApi = new HTTPTransport('/user');

export default class UsersApi {
	async changeProfile(data: ProfileModelType): Promise<void | APIError> {
		return usersApi.put('/profile', { data });
	}

	async changeAvatar(data: FormData): Promise<ChangeAvatarResponse | APIError> {
		return usersApi.put('/profile/avatar', { data });
	}

	async changePassword(data: PasswordModelType): Promise<void | APIError> {
		return usersApi.put('/password', { data });
	}

	async findChatUser(data: Record<string, string>): Promise<void | APIError> {
		return usersApi.post('/search', { data });
	}
}
