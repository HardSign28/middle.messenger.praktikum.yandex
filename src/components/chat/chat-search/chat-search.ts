import Block from '@/core/block';
export default class ChatSearch extends Block {
	constructor(props) {
		super('main', {
			...props,
			formState: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			className: 'page-chat',
		});
	}

	public render(): string {
		return `
		<div class="chat__search">
			<input type="search" class="chat__search-input" placeholder="Поиск" />
			<span class="icon"></span>
		</div>
    	`;
	}
}
