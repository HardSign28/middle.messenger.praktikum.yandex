export type PasswordModel = {
	old_password: string;
	new_password: string;
}

export type ProfileModel = {
	first_name: string;
	second_name: string;
	login: string;
	display_name: string;
	phone: string;
	email: string;
	password: string;
}

export type responseErrorType = {
	data: {
		reason: string
	}
	status: number
}

export type loginModel = {
	login: string,
	password: string,
}

export type RegisterModel = {
	login: string,
	password: string,
	first_name: string,
	second_name: string,
	email: string,
	phone: string,
}
