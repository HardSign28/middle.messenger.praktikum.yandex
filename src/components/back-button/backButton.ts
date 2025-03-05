import Block from '@/core/block';

export default class BackButton extends Block {
	constructor(props) {
		super('a', {
			...props,
			className: [
				'back-button',
				props.class,
			]
				.filter(Boolean)
				.join(' '),
			events: {
				click: props.onClick,
			},
			attrs: {
				href: props.href || '#',
				/// ...(props.href ? { href: props.href } : {}),
			},
		});
	}

	public render(): string {
		return `
			<div class="back-button__icon">
				<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						clip-rule="evenodd"
						d="m12 2.75c-5.10863 0-9.25 4.14137-9.25 9.25 0 5.1086 4.14137 9.25 9.25 9.25 5.1086 0 9.25-4.1414 9.25-9.25 0-5.10863-4.1414-9.25-9.25-9.25zm-10.75 9.25c0-5.93706 4.81294-10.75 10.75-10.75 5.9371 0 10.75 4.81294 10.75 10.75 0 5.9371-4.8129 10.75-10.75 10.75-5.93706 0-10.75-4.8129-10.75-10.75zm12.7803-3.53033c.2929.29289.2929.76777 0 1.06066l-2.4696 2.46967 2.4696 2.4697c.2929.2929.2929.7677 0 1.0606s-.7677.2929-1.0606 0l-3.00003-3c-.29289-.2929-.29289-.7677 0-1.0606l3.00003-3.00003c.2929-.29289.7677-.29289 1.0606 0z"
						fill="#1c274c"
						fill-rule="evenodd"
					/>
				</svg>
			</div>
    `;
	}
}
