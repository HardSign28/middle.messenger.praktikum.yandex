type PlainObject<T = unknown> = {
	[k in string]: T;
};

type ArrayOrPlainObject<T = unknown> = PlainObject<T> | T[];

function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
		&& Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: ArrayOrPlainObject, rhs: ArrayOrPlainObject): boolean {
	if (isPlainObject(lhs) && isPlainObject(rhs)) {
		if (Object.keys(lhs).length !== Object.keys(rhs).length) {
			return false;
		}

		for (const [key, value] of Object.entries(lhs)) {
			const rightValue = rhs[key];
			if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
				if (!isEqual(value, rightValue)) {
					return false;
				}
			} else if (value !== rightValue) {
				return false;
			}
		}

		return true;
	}

	if (isArray(lhs) && isArray(rhs)) {
		if (lhs.length !== rhs.length) {
			return false;
		}

		return lhs.every((item, index) => isEqual(item, rhs[index]));
	}

	return lhs === rhs;
}

export default isEqual;
