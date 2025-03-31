import Block from '@/core/block';
import { Dialog } from '@/components';
import { DefaultProps } from '@/types/props';
import { DialogRemoveProps } from '@/types/dialog';

class DialogBody extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,
			className: 'remove-text',
		});
	}

	public setText() {
		this.getContent().innerHTML = `Вы точно хотите удалить чат ${this.props.chatName}?`;
	}

	render(): string {
		const dialogRemoveText = this.setText();
		return '{{ dialogRemoveText }}';
	}
}

export default class DialogRemoveChat extends Block {
	constructor(props: DialogRemoveProps) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Удалить чат',
				labelOk: 'Удалить',
				labelCancel: 'Отмена',
				onOk: () => {
					const chatId = Number(
						this.children.Dialog.children.Body.props.chatId,
					);

					if (!chatId) {
						(this.children.Dialog as Dialog).setError('Чат не выбран');
						return;
					}

					if (props.onOk) {
						props.onOk(chatId);
					}
				},
				onCancel: props.onCancel,
				Body: new DialogBody(props),
			}),
		});
	}

	public render(): string {
		return `
			{{{ Dialog }}}
    	`;
	}
}
