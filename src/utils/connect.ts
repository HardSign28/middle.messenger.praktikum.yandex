import Block from '@/core/block';
import { StoreEvents } from '@/core/Store';
import { DefaultProps } from '@/types/props';
import isEqual from './isEqual';

type MapStateToProps<PropsFromState> = (state: Record<string, unknown>) => Partial<PropsFromState>;

export function connect<PropsFromState>(
	mapStateToProps: MapStateToProps<PropsFromState>,
) {
	return function <
		ComponentProps extends DefaultProps, // Свойства компонента должны включать состояние
	> (
		Component: new (props: ComponentProps) => Block,
	) {
		return class extends Component {
			private onChangeStoreCallback: () => void;

			constructor(props: Omit<ComponentProps, keyof PropsFromState>) {
				const { store } = window;
				let state = mapStateToProps(store.getState());

				super({ ...props, ...state } as ComponentProps);

				this.onChangeStoreCallback = () => {
					const newState = mapStateToProps(store.getState());

					if (!isEqual(state, newState)) {
						this.setProps({ ...newState });
					}

					state = newState;
				};

				store.on(StoreEvents.Updated, this.onChangeStoreCallback);
			}
		};
	};
}
