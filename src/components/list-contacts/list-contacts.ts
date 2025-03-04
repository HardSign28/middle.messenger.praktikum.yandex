import { ContactCard} from '@/components';
import Block from '@/core/block';
export default class ListContacts extends Block {
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
			contacts: props.contacts.map(
				(contact) =>
					new ContactCard({
						...contact,
					})
			),
		});
	}

	public render(): string {
		console.log('contacts1', this.props.contacts)
		return `
		<nav>
			<ul>
				{{#each contacts }}
					<li>{{{ this }}}</li>
				{{/each}}
			</ul>
		</nav>
    	`;
	}
}
