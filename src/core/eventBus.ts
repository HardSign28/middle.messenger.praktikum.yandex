type EventCallback<T extends unknown[] = unknown[]> = (...args: T) => void;

export default class EventBus<E extends string> {
	private listeners: Record<E, EventCallback[]>;

	constructor() {
		this.listeners = {} as Record<E, EventCallback[]>;
	}

	on<T extends unknown[]>(event: E, callback: EventCallback<T>) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(callback as EventCallback<unknown[]>);
	}

	off<T extends unknown[]>(event: E, callback: EventCallback<T>) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}
		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback,
		);
	}

	emit<T extends unknown[]>(event: E, ...args: T) {
		if (!this.listeners[event]) {
			return;
		}
		this.listeners[event].forEach((listener) => {
			listener(...args);
		});
	}
}
