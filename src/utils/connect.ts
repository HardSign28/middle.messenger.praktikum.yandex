import { StoreEvents } from '@/core/Store';
import { DefaultProps } from '@/types/props';
import isEqual from './isEqual';

type MapStateToProps<T> = (state: Record<string, unknown>) => Partial<T>;

export function connect<T extends DefaultProps>(mapStateToProps: MapStateToProps<T>) {
	return function <P extends T & DefaultProps> (
		Component: new (props: P) => {
			setProps: (nextProps: Partial<P>) => void;
		},
	) {
		return class extends Component {
			private onChangeStoreCallback: () => void;

			constructor(props: P) {
				const { store } = window;
				let state = mapStateToProps(store.getState());

				super({ ...props, ...state });

				this.onChangeStoreCallback = () => {
					const newState = mapStateToProps(store.getState());

					if (!isEqual(state, newState)) {
						this.setProps({ ...newState } as Partial<P>);
					}

					state = newState;
				};

				store.on(StoreEvents.Updated, this.onChangeStoreCallback);
			}
		};
	};
}
