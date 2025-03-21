import './style.scss';
import Handlebars from 'handlebars';
import '@/helpers/handlebars';
import { pages } from '@/data/pages';
import Block from '@/core/block';
import * as Components from './components';
import renderDOM from './core/renderDom';

Object.entries(Components).forEach(([name, template]) => {
	if (typeof template === 'function') {
		return;
	}
	Handlebars.registerPartial(name, template);
});

/**
 * Навигация по страницам
 * @param page
 */
const navigate = (page: keyof typeof pages) => {
	const { name, template, context } = pages[page];
	if (typeof template === 'function' && template.prototype instanceof Block) {
		// eslint-disable-next-line new-cap
		renderDOM(new (template as new (props: unknown) => Block)({ pages }));
		return;
	}
	const container = document.getElementById('app')!;
	const fullContext = { ...context, pages, currentPage: name };
	const templatingFunction = Handlebars.compile(template);
	container.innerHTML = templatingFunction(fullContext);
};

document.addEventListener('DOMContentLoaded', () => navigate('nav'));
document.addEventListener('click', (e) => {
	const target = e.target as HTMLElement | null;

	if (target && target.hasAttribute('page')) {
		const page = target.getAttribute('page') as keyof typeof pages;

		navigate(page);

		e.preventDefault();
		e.stopImmediatePropagation();
	}
});
