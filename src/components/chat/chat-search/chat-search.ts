import Block from '@/core/block';
import { Input } from '@/components/input';
import { ChatSearchProps } from '@/types/chat';

export default class ChatSearch extends Block {
	constructor(props: ChatSearchProps) {
		super('div', {
			...props,
			className: 'chat__search',
			Input: new Input({
				className: 'chat__search-input',
				placeholder: 'Поиск',
				type: 'search',
				events: {
					input: props.onChange,
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
