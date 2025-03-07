import Block from '@/core/block';

export default class FileUpload extends Block {
	constructor(props) {
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
