enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

type Options = {
	method: METHOD;
	data?: Record<string, unknown> | FormData;
	id?: number;
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

		const headers = new Headers();

		if (!(data instanceof FormData)) {
			headers.set('Content-Type', 'application/json');
		}

		const response = await fetch(url, {
			method,
			credentials: 'include',
			mode: 'cors',
			headers,
			body: data instanceof FormData ? data : JSON.stringify(data) || null,
		});

		let resultData: TResponse | null = null;

		const contentType = response.headers.get('content-type');
		const isJson = contentType?.includes('application/json');

		if (isJson) {
			resultData = await response.json();
		}

		if (!response.ok) {
			throw {
				status: response.status,
				statusText: response.statusText,
				data: resultData,
			};
		}

		return resultData as TResponse;
	}
}
