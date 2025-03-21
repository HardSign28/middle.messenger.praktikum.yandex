import Block from '@/core/block';
import { DefaultProps } from '@/types/props';

export default class FileUpload extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,
			className: 'file-upload',
		});
	}

	public render(): string {
		return `
			<div class="file-upload__icon"></div>
			Загрузить
    	`;
	}
}
