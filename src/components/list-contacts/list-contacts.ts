import { ContactCard } from '@/components';
import Block from '@/core/block';
import { ListContactsProps } from '@/types/chat';
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

	createContactCard(contact: any, index: number) {
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
			const newContactComponents = (newProps.contacts ?? [])
				.map((contact, index: number) => this.createContactCard(contact, index));

			this.children.contactComponents = newContactComponents;
			this.setProps({
				contactComponents: newContactComponents,
			});
		}
		return true;
	}

	public render(): string {
		const { activeContactIndex } = this.props;
		const { contactComponents } = this.children;

		(contactComponents as unknown as ContactCard[] ?? [])
			.forEach((contact: ContactCard, index: number) => {
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
