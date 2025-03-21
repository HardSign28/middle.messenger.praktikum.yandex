import Block from './block';

export default function renderDOM(block: Block) {
	const root = document.querySelector('#app');

	root!.innerHTML = '';

	const content = block.getContent();
	if (!content) {
		throw new Error('getContent() вернул null.');
	}
	root!.appendChild(content);
}

export function render(query: string, block: Block) {
	const root = document.querySelector(query);

	if (!root) {
		throw new Error(`Элемент с селектором "${query}" не найден.`);
	}

	// Можно завязаться на реализации вашего класса Block
	const content = block.getContent();
	if (!content) {
		throw new Error('getContent() вернул null.');
	}
	root!.appendChild(content);

	block.dispatchComponentDidMount();

	return root;
}
