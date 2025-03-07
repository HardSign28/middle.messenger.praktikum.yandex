import Block from '@/core/block';
import { Button } from '@/components';

export default class Dialog extends Block {
	constructor(props) {
		super('div', {
			...props,
			className: 'dialog',
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
