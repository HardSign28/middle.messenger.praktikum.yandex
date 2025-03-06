import Block from '@/core/block';

export default class Avatar extends Block {
	constructor(props) {
		super('div', {
			...props,
			className: 'avatar__image-wrapper',
			edit: props.edit,
			imgUrl: props.imgUrl,
			size: props.size,
		});
	}
	public render(): string {
		return `
			<figure class="avatar__image {{ class }} {{#if size }} avatar__image_{{ size }}{{/if}}"
				{{#if edit }}
				role="button"
				tabindex="0"
				aria-label="Изменить фото профиля"
				{{/if}}
				itemscope
				itemtype="https://schema.org/ImageObject"
				>
				{{#if imgUrl }}
					<img src="{{ imgUrl }}"
						alt="Аватар пользователя"
						itemprop="contentUrl"
						class="avatar__photo">
				{{ else }}
					{{{ defaultAvatar }}}
				{{/if}}
				{{#if edit }}
					<div class="avatar__overlay">
						<span class="avatar__text">Поменять аватар</span>
					</div>
				{{/if}}
			</figure>
    	`;
	}
}
