import Block from '@/core/block';
import { connect } from '@/utils/connect';
import { DefaultProps } from '@/types/props';
import { Button } from '@/components';
// eslint-disable-next-line import/no-unresolved
import closeIcon from '@/assets/icons/chat-delete-user.svg?raw';

class Alert extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,
			className: [
				'alert__wrapper',
				props.class,
			]
				.filter(Boolean)
				.join(' '),
			events: {
				click: props.onClick,
			},
			CloseButton: new Button({
				class: 'alert__close',
				label: closeIcon,
				onClick: (e) => {
					e.preventDefault();
					window.store.set({ alertMessage: null });
				},
			}),
		});
	}

	public render(): string {
		return `
	{{#if alertMessage }}
     <div class="alert alert--{{ alertMessage.status }}">
        {{ alertMessage.message }}
        {{{ CloseButton }}}
      </div>
      {{/if }}
    `;
	}
}

const mapStateToProps = (state: Record<string, unknown>) => ({
	alertMessage: state.alertMessage,
});

export default connect(mapStateToProps)(Alert);
