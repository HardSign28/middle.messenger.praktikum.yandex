import Block from '@/core/block';

type NavigatePageProps = Record<string, unknown>;

export default class NavigatePage extends Block {
	constructor(props: NavigatePageProps) {
		super('main', {
			...props,
			className: 'page page-navigate bg-gradient',
		});
	}

	public render(): string {
		return `
			<div class="container w-100">
				<section class="card">
					<h1 class="card__title text-center">
						Навигация
					</h1>
					<nav>
						<ul class="navigate-list">
							{{#each pages}}
								{{#unless (eq @key "nav")}}
									<li class="navigate-list__item">
										<a
											class="navigate-list__item-link"
											href="#"
											page="{{@key}}"
										>
											{{this.name}}
										</a>
									</li>
								{{/unless}}
							{{/each}}
						</ul>
					</nav>
				</section>
			</div>
    	`;
	}
}
