import Block from '@/core/block';
import { Dialog, FileUpload } from '@/components';
import { DefaultProps } from '@/types/props';
import { DialogUploadProps } from '@/types/dialog';

class DialogBody extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,
			FileUpload: new FileUpload({}),
		});
	}

	render(): string {
		return '{{{ FileUpload }}}';
	}
}

export default class DialogUpload extends Block {
	constructor(props: DialogUploadProps) {
		super('div', {
			...props,
			className: 'dialog-container',
			Dialog: new Dialog({
				title: 'Загрузите файл',
				labelOk: 'Поменять',
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
