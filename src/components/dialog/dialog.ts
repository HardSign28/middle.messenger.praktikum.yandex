import Block from '@/core/block';
import { Button } from '@/components';
import { DialogType } from '@/types/dialog';

export default class Dialog extends Block {
	private errorTimeout: ReturnType<typeof setTimeout> | null = null;

	constructor(props: DialogType) {
		super('div', {
			...props,
			className: 'dialog',
			events: {
				click: (e: MouseEvent) => {
					const target = e.target as HTMLElement;
					if (target.classList.contains('dialog__close')) {
						props.onCancel?.();
					}
				},
			},
			OkButton: new Button({
				label: props.labelOk,
				type: 'primary',
				onClick: props.onOk,
			}),
			CancelButton: new Button({
				label: props.labelCancel,
				type: 'outline-primary',
				onClick: props.onCancel,
			}),
		});
	}

	public setError(message: string, timeout = 3000) {
		this.setProps({ error: message });

		if (this.errorTimeout) {
			clearTimeout(this.errorTimeout);
		}

		this.errorTimeout = setTimeout(() => {
			this.setProps({ error: null });
			this.errorTimeout = null;
		}, timeout);
	}

	public render(): string {
		return `
			<div class="dialog__close"></div>
			<div class="dialog__header">
				<h2 class="dialog__title">{{ title }}</h2>
			</div>
			<div class="dialog__body">
				{{{ Body }}}
				<div class="error-message dialog__error">
					{{ error }}
				</div>
			</div>
			<div class="dialog__footer">
				{{#if labelCancel}}
					{{{ CancelButton }}}
				{{/if}}
				{{{ OkButton }}}
			</div>
    	`;
	}
}
