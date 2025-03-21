enum METHODS {
	GET= 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

interface RequestOptions {
	headers?: Record<string, string>;
	data?: Record<string, unknown>;
	timeout?: number;
}

interface RequestOptionsWithMethod extends RequestOptions {
	method: METHODS;
}

const queryStringify = (data: Record<string, unknown>) => {
	// Можно делать трансформацию GET-параметров в отдельной функции
	if (!data || typeof data !== 'object') return '';
	return (
		`?${
			Object.entries(data)
				.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
				.join('&')}`
	);
};

export default class HTTPTransport {
	get(url: string, options: RequestOptions = {}) {
		return this.request(
			url + queryStringify(options.data ?? {}),
			{ ...options, method: METHODS.GET },
			options.timeout,
		);
	}

	post(url: string, options: RequestOptions = {}) {
		return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
	}

	put(url: string, options: RequestOptions = {}) {
		return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
	}

	delete(url: string, options: RequestOptions = {}) {
		return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
	}

	patch(url: string, options: RequestOptions = {}) {
		return this.request(url, { ...options, method: METHODS.PATCH }, options.timeout);
	}

	// options:
	// headers — obj
	// data — obj
	request = (
		url: string,
		options: RequestOptionsWithMethod,
		timeout = 5000,
	) => new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(options.method, url);

		xhr.timeout = timeout;

		if (options.headers) {
			Object.entries(options.headers).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value);
			});
		}

		xhr.onload = () => resolve(xhr);
		xhr.onerror = () => reject(new Error(`Network error on ${url}`));
		xhr.ontimeout = () => reject(new Error(`Timeout exceeded: ${timeout}ms on ${url}`));

		if (options.method === METHODS.GET || !options.data) {
			xhr.send();
		} else {
			xhr.send(JSON.stringify(options.data));
		}
	});
}
