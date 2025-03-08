import Block from '@/core/block';

type FileUploadProps = Record<string, unknown>;
export default class FileUpload extends Block {
	constructor(props: FileUploadProps) {
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
