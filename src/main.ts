import Handlebars from 'handlebars';
import '@/helpers/handlebars';
import * as Components from './components';
import './style.scss';
import { pages } from '@/data/pages';

Object.entries(Components).forEach(([name, template]) => {
	Handlebars.registerPartial(name, template);
});

/**
 * Навигация по страницам
 * @param page
 */
const navigate = (page: keyof typeof pages) => {
	const { template, context, name } = pages[page];
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
