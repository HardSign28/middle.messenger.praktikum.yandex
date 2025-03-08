import Block from '@/core/block';

type ButtonProps = {
	class?: string;
	type?: string;
	onClick?: () => void;
	size?: string;
	label?: string;
}
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
