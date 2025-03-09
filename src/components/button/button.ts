import Block from '@/core/block';
import { ButtonProps } from '@/types/button';

export default class Button extends Block {
	constructor(props: ButtonProps) {
		super('button', {
			...props,
			className: [
				'button',
				props.class,
				props.type ? `button__${props.type}` : '',
				props.size ? `button_${props.size}` : '',
			]
				.filter(Boolean)
				.join(' '),
			events: {
				click: props.onClick,
			},
		});
	}

	public render(): string {
		return `
      {{ label }}
    `;
	}
}
