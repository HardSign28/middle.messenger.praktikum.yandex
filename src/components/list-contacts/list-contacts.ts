import { ContactCard } from '@/components';
import Block from '@/core/block';
import { Contact, ListContactsProps } from '@/types/chat';
import { DefaultProps } from '@/types/props';

export default class ListContacts extends Block {
	constructor(props: ListContactsProps) {
		super('nav', {
			...props,
			className: 'page-chat',
			activeContactIndex: -1,
			contactComponents: (props.contacts ?? []).map((contact, index) => new ContactCard({
				...contact,
				onClick: () => {
					this.setProps({ activeContactIndex: index });
					if (typeof this.props.onSelectContact === 'function') {
						this.props.onSelectContact(index);
					}
				},
			})),
		});
	}

	createContactCard(contact: Contact, index: number) {
		return new ContactCard({
			...contact,
			onClick: () => {
				this.setProps({ activeContactIndex: index });
				if (typeof this.props.onSelectContact === 'function') {
					this.props.onSelectContact(index);
				}
			},
		});
	}

	componentDidUpdate(oldProps: DefaultProps, newProps: DefaultProps) {
		if (oldProps.contacts !== newProps.contacts) {
			const newContactComponents = Array.isArray(newProps.contacts)
				? newProps.contacts.map((contact, index: number) => this.createContactCard(contact, index))
				: [];

			this.children.contactComponents = newContactComponents as unknown as Block<DefaultProps>[];
			this.setProps({
				contactComponents: newContactComponents,
			});
		}
		return true;
	}

	public render(): string {
		const { activeContactIndex } = this.props;
		const { contactComponents } = this.children;

		(contactComponents as Block<DefaultProps>[] ?? [])
			.forEach((contact: Block<DefaultProps>, index: number) => {
				if (index === activeContactIndex) {
					contact.setProps({ active: true });
					return;
				}

				if (contact.props.active) {
					contact.setProps({ active: false });
				}
			});
		return `
			<ul>
				{{#each contactComponents }}
					<li>{{{ this }}}</li>
				{{/each}}
			</ul>
    	`;
	}
}
