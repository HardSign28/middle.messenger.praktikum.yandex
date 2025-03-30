import EventBus from './eventBus';

export enum StoreEvents {
	Updated = 'Updated',
}

type alertMessageType = {
	status: 'success' | 'error';
	message: string;
	timeout: number;
}

export class Store<T extends Record<string, unknown>> extends EventBus<StoreEvents> {
	// eslint-disable-next-line no-use-before-define
	private static __instance: Store<Record<string, unknown>> | null = null;

	private state: T = {} as T;

	constructor(defaultState: T) {
		if (Store.__instance) {
			return Store.__instance as Store<T>;
		}
		super();

		this.state = defaultState;
		this.set(defaultState);

		Store.__instance = this;
	}

	public getState(): T {
		return this.state;
	}

	public set(nextState: Partial<T>): void {
		const prevState = { ...this.state };

		this.state = { ...this.state, ...nextState };

		this.emit(StoreEvents.Updated, prevState, this.state);
	}

	public setAlertMessage({ status, message, timeout = 5000 }:alertMessageType) {
		this.set({
			alertMessage: { status, message },
		} as Partial<T & { alertMessage: alertMessageType | null }>);

		setTimeout(() => {
			this.set({ alertMessage: null } as Partial<T & { alertMessage: alertMessageType | null }>);
		}, timeout);
	}
}
