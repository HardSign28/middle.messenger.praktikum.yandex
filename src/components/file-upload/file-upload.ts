import Block from '@/core/block';
import { DefaultProps } from '@/types/props';

export default class FileUpload extends Block {
	constructor(props: DefaultProps) {
		super('div', {
			...props,
			events: {
				change: (e: Event) => this.onFileChange(e),
			},
			previewSrc: '',
		});
	}

	private onFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input?.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				this.setProps({ previewSrc: e.target?.result as string });
			};
			reader.readAsDataURL(file);
			window.store.set({ selectedFile: file });
		}
	}

	public resetPreview() {
		this.setProps({ previewSrc: '' });
		window.store.set({ selectedFile: null });
	}

	public render(): string {
		return `
		<label class="file-upload">
			<input 
				type="file" 
				class="file-upload__input" 
				accept="image/*" 
				onchange="{{ onFileChange }}" 
			/>
			<div class="file-upload__icon"></div>
			Загрузить файл
		</label>
			{{#if previewSrc }}
			<div class="file-upload__preview">
			Предпросмотр:
				<img 
					src="{{ previewSrc }}" 
					class="file-upload__preview-img" 
					alt="Превью" 
				/>
			</div>
			{{/if}}
    	`;
	}
}
