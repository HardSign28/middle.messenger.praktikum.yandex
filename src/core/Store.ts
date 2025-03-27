import EventBus from './eventBus';

export enum StoreEvents {
	Updated = 'Updated',
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
}
