import { Button } from '@/components';
import Block from '@/core/block';
import img500 from '@/assets/icons/500.webp';

type ServerErrorPageProps = Record<string, unknown>;
export default class ServerErrorPage extends Block {
	constructor(props: ServerErrorPageProps) {
		super('main', {
			...props,
			className: 'page page-error bg-gradient',
			BackButton: new Button({
				label: 'Назад к чатам',
				size: 'lg',
				type: 'primary',
				onClick: (e: MouseEvent) => {
					e.preventDefault();
				},
			}),
		});
	}

	public render(): string {
		return `
		<div class="container">
			<section class="error">
				<img class="error__image"
					src="${img500}"
					width="1920"
					height="1920"
					alt="Ошибка 500: внутренняя ошибка сервера">
				<h1 class="error__title">500</h1>
				<h2 class="error__description mb-20">Мы уже фиксим</h2>
				<div role="navigation">{{{ BackButton }}}</div>
			</section>
		</div>
    	`;
	}
}
