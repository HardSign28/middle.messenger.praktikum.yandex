type WebSocketEvents = {
	open?: () => void;
	close?: (event: CloseEvent) => void;
	message?: (data: unknown) => void;
	error?: (event: Event) => void;
};

export class WSTransport {
	private socket: WebSocket;

	private isConnected: boolean = false;

	private eventHandlers: WebSocketEvents = {};

	private keepAliveInterval: ReturnType<typeof setInterval> | null = null;

	constructor(url: string) {
		this.socket = new WebSocket(url);
		this.initEventListeners();
	}

	private initEventListeners() {
		this.socket.addEventListener('open', () => {
			this.isConnected = true;
			// console.log('Соединение установлено');
			this.startKeepAlive();
			if (this.eventHandlers.open) this.eventHandlers.open();
		});

		this.socket.addEventListener('close', (event) => {
			this.isConnected = false;
			this.stopKeepAlive();
			if (event.wasClean) {
				// console.log('Соединение закрыто чисто');
			} else {
				// console.log('Обрыв соединения');
			}
			// console.log(`Код: ${event.code} | Причина: ${event.reason}`);
			if (this.eventHandlers.close) this.eventHandlers.close(event);
		});

		this.socket.addEventListener('message', (event) => {
			if (this.eventHandlers.message) this.eventHandlers.message(event.data);
		});

		this.socket.addEventListener('error', (event) => {
			// console.log('Ошибка', event);
			if (this.eventHandlers.error) this.eventHandlers.error(event);
		});
	}

	private startKeepAlive(interval: number = 30000): void {
		this.stopKeepAlive();
		this.keepAliveInterval = setInterval(() => {
			if (this.isConnected) {
				this.send({ type: 'ping' });
			}
		}, interval);
	}

	private stopKeepAlive(): void {
		if (this.keepAliveInterval) {
			clearInterval(this.keepAliveInterval);
			this.keepAliveInterval = null;
		}
	}

	public send(data: Record<string, unknown>): void {
		if (!this.isConnected) {
			// console.error('Соединение WebSocket не установлено. Невозможно отправить сообщение.');
			return;
		}
		this.socket.send(JSON.stringify(data));
	}

	public close(): void {
		if (this.isConnected) {
			this.socket.close();
		}
	}

	public on<Event extends keyof WebSocketEvents>(
		event: Event,
		handler: WebSocketEvents[Event],
	): void {
		this.eventHandlers[event] = handler;
	}
}
