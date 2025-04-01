import Block from '@/core/block';
import { AvatarProps } from '@/types/avatar';
import { connect } from '@/utils/connect';

class Avatar extends Block {
	constructor(props: AvatarProps) {
		super('div', {
			...props,
			className: 'avatar__image-wrapper',
			events: {
				click: props.onClick,
			},
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

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(Avatar);
