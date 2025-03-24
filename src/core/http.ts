enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

type Options = {
	method: METHOD;
	data?: Record<string, unknown>;
	timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
	private apiUrl: string = '';

	constructor(apiPath: string) {
		this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
	}

	get<TResponse>(
		url: string,
		options: OptionsWithoutMethod = {},
	): Promise<TResponse> {
		return this.request<TResponse>(`${this.apiUrl}${url}`, {
			...options,
			method: METHOD.GET,
		});
	}

	post<TResponse>(
		url: string,
		options: OptionsWithoutMethod = {},
	): Promise<TResponse> {
		return this.request<TResponse>(`${this.apiUrl}${url}`, {
			...options,
			method: METHOD.POST,
		});
	}

	put<TResponse>(
		url: string,
		options: OptionsWithoutMethod = {},
	): Promise<TResponse> {
		console.log('options', options);

		for (const [key, value] of options.data.entries()) {
			console.log(key, value); // Должны увидеть: "file", File {...}
		}

		return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT });
	}

	delete(url: string, options: OptionsWithoutMethod = {}) {
		return this.request(url, { ...options, method: METHOD.DELETE });
	}

	patch(url: string, options: OptionsWithoutMethod = {}) {
		return this.request(url, { ...options, method: METHOD.PATCH });
	}

	async request<TResponse>(
		url: string,
		options: Options = { method: METHOD.GET },
	): Promise<TResponse> {
		const { method, data } = options;

		const headers = data instanceof FormData
			? {}
			: { 'Content-Type': 'application/json' };
		const response = await fetch(url, {
			method,
			credentials: 'include',
			mode: 'cors',
			headers,
			body: data instanceof FormData ? data : data ? JSON.stringify(data) : null,
		});

		if (!response.ok) {
			throw response;
		}

		const isJson = response.headers
			.get('content-type')
			?.includes('application/json');
		const resultData = (await isJson) ? response.json() : null;

		return resultData as unknown as TResponse;
	}
}
