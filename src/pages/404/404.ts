import { Button } from '@/components';
import Block from '@/core/block';
import img404 from '@/assets/icons/404.webp';

export default class NotFoundPage extends Block {
	constructor(props) {
		super('main', {
			...props,
			className: 'page page-not-found bg-gradient',
			BackButton: new Button({
				label: 'Назад к чатам',
				size: 'lg',
				type: 'primary',
				onClick: (e) => {
					e.preventDefault();
					// console.log();
				},
			}),
		});
	}

	public render(): string {
		return `
		<div class="container">
			<section class="not-found">
				<img class="not-found__image"
					src="${img404}"
					width="512"
					height="481"
					alt="Ошибка 404: страница не найдена">
				<h1 class="not-found__title">404</h1>
				<h2 class="not-found__description mb-20">Не туда попали</h2>
				<div role="navigation">{{{ BackButton }}}</div>
			</section>
		</div>
    	`;
	}
}
