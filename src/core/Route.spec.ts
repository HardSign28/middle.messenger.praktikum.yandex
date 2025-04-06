import { expect } from 'chai';
import sinon from 'sinon';
import Route from '@/core/Route';
import Block from '@/core/block';

describe('Route', () => {
	let route: Route;

	beforeEach(() => {
		const mockAppElement = document.createElement('div');
		mockAppElement.id = 'app';
		document.body.appendChild(mockAppElement);

		route = new Route('/home', Block, { rootQuery: '#app' });
	});

	afterEach(() => {
		document.body.innerHTML = '';
		sinon.restore();
	});

	it('должен добавлять и проверять маршрут через getPathName', () => {
		expect(route.getPathName()).to.equal('/home');
		route = new Route('/about', Block, { rootQuery: '#app' });
		expect(route.getPathName()).to.equal('/about');
	});

	it('должен проверять совпадение маршрута через match', () => {
		expect(route.match('/home')).to.be.true;
		expect(route.match('/about')).to.be.false;
	});

	it('должен обновлять путь при навигации через navigate', () => {
		const mockElement = document.createElement('main');
		mockElement.id = 'main';
		document.body.appendChild(mockElement);

		route.navigate('/test');

		const element = document.querySelector('#main') as HTMLElement;
		expect(element.style.display).to.eql('');
	});

	it('должен корректно работать _renderDom', () => {
		const rootQuery = '#app';
		const mockRoot = { innerHTML: '', append: sinon.spy() };
		sinon.stub(document, 'querySelector').withArgs(rootQuery).returns(mockRoot as any);

		route.render();

		expect(document.querySelector.calledWith(rootQuery)).to.be.true;
		expect(mockRoot.append.calledOnce).to.be.true;
	});

	it('должен правильно работать с ошибками в _renderDom, если элемент не найден', () => {
		sinon.stub(document, 'querySelector').returns(null);

		expect(() => route.render()).to.throw('Element not found for query: #app');
	});
});
