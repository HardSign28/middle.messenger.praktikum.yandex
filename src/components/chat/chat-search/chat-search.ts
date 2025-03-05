import Block from '@/core/block';

export default class ChatSearch extends Block {
	constructor(props) {
		super('div', {
			...props,
			formState: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			className: 'chat__search',
		});
	}

	public render(): string {
		return `
		<input type="search" class="chat__search-input" placeholder="Поиск" />
		<span class="icon"></span>
    	`;
	}
}
