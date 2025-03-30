import Block from '@/core/block';
import { Dialog } from '@/components';
import { DefaultProps } from '@/types/props';
import { DialogRemoveProps } from '@/types/dialog';

class DialogBody extends Block {
	constructor(props: DefaultProps) {
		super('p', {
			...props,
			className: 'remove-text',
		});
	}

	render(): string {
		return 'Вы точно хотите удалить переписку с пользователем {{ userName }}?';
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
					console.log('userId', this.props.userId);
					const userId = Number(
						this.props.userId,
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
