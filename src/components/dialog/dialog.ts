import Block from '@/core/block';
import { Button } from '@/components';
import { DialogType } from '@/types/dialog';

export default class Dialog extends Block {
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

	public render(): string {
		return `
			<div class="dialog__close"></div>
			<div class="dialog__header">
				<h2 class="dialog__title">{{ title }}</h2>
			</div>
			<div class="dialog__body">{{{ Body }}}</div>
			<div class="dialog__footer">
				{{#if labelCancel}}
					{{{ CancelButton }}}
				{{/if}}
				{{{ OkButton }}}
			</div>
    	`;
	}
}
