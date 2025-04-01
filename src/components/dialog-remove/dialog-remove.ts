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
		const content = this.getContent();
		if (!content) return;
		content.innerHTML = `Вы точно хотите удалить пользователя ${this.props.userName}?`;
	}

	render(): string {
		this.setText();
		return '';
	}
}

export default class DialogRemove extends Block {
	constructor(props: DialogRemoveProps) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Удалить пользователя',
				labelOk: 'Удалить',
				labelCancel: 'Отмена',
				onOk: () => {
					const userId = Number(
						((this.children.Dialog as Block).children.Body as Block).props.userId,
					);

					if (!userId) {
						(this.children.Dialog as Dialog).setError('Пользователь не выбран');
						return;
					}

					if (props.onOk) {
						props.onOk(userId);
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
