import Block from '@/core/block';
import { Dialog } from '@/components';

class DialogBody extends Block {
	constructor(props) {
		super('p', {
			...props,
			className: 'remove-text',
			userName: props.userName || '',
		});
	}

	render(): string {
		return 'Вы точно хотите удалить переписку с пользователем {{ userName }}?';
	}
}

export default class DialogRemove extends Block {
	constructor(props) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Удалить пользователя',
				labelOk: 'Удалить',
				labelCancel: 'Отмена',
				onOk: props.onOk,
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
