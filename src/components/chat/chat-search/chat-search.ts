import Block from '@/core/block';
import { Input } from '@/components/input';

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
			Input: new Input({
				...props,
				className: 'chat__search-input',
				placeholder: 'Поиск',
				type: 'search',
				onChange: (e) => {
					// console.log('e', e)
					if (this.props.onChange) {
						this.props.onChange(e);
					}
				},
			}),
		});
	}

	public render(): string {
		return `
		{{{ Input }}}
		<span class="icon"></span>
    	`;
	}
}
