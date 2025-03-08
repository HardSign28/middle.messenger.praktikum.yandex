import Block from '@/core/block';

/**
 * Валидация поля
 * @param value
 * @param field
 */
export const validateField = (value:string, field:string) => {
	let error = '';

	// Валидация поля login
	if (field === 'login') {
		if (value.length < 3 || value.length > 20) {
			error = 'Длина должна быть от 3 до 20 символов';
			return error;
		}

		if (/^\d+$/.test(value)) {
			error = 'Не может содержать только цифры';
			return error;
		}

		if (/\s/.test(value)) {
			error = 'Не может содержать пробелы';
			return error;
		}

		if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
			error = 'Может содержать только цифры, латиницу, дефис и нижнее подчёркивание';
			return error;
		}
	}

	// Валидация firstName, secondName
	if (field === 'firstName' || field === 'secondName') {
		if (!/^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(value)) {
			error = 'Только латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
			return error;
		}
	}

	// Валидация phone
	if (field === 'phone') {
		if (!/^\+?\d{10,15}$/.test(value)) {
			error = 'От 10 до 15 цифр, может начинается с +';
			return error;
		}
	}

	// Валидация email
	if (field === 'email') {
		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)+$/.test(value)) {
			error = 'Неверный Email';
			return error;
		}
	}

	// Валидация password
	if (field === 'password') {
		if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value)) {
			error = 'Пароль должен быть от 8 до 40 символов, хотя бы одна заглавная буква и цифра';
			return error;
		}
	}

	// Валидация message
	if (field === 'message') {
		if (!value) {
			error = 'Не должно быть пустым';
			return error;
		}
	}

	return error;
};

/**
 * Валидация полей
 * @param formState
 * @param children
 * @param fields
 */
export const validateAll = (
	formState: Record<string, string>,
	children: Record<string, Block>,
	...fields:string[]
) => {
	fields.forEach((field) => {
		const value = formState[field]; // Получаем текущее значение поля
		const error = validateField(value, field); // Вызываем валидацию

		const inputName = `Input${field.charAt(0).toUpperCase() + field.slice(1)}`;

		if (children[inputName]) {
			children[inputName].setProps({ error }); // Устанавливаем ошибку в Input
		}
	});
};
