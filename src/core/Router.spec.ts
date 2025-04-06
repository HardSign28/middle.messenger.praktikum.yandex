import { expect } from 'chai';
import sinon from 'sinon';
import Router from '@/core/Router';
import { authServices } from '@/services/auth';
import Block from '@/core/block';
import { ROUTER } from '@/constants';

describe('Router', () => {
	let router: Router;
	let checkLoginUserStub: sinon.SinonStub;

	beforeEach(() => {
		router = new Router('#app');
		checkLoginUserStub = sinon.stub(authServices, 'checkLoginUser').resolves();
		sinon.stub(window.history, 'pushState').callsFake(() => {});
	});

	afterEach(() => {
		sinon.restore();
	});

	it('должен добавлять маршрут через use', () => {
		router.use(ROUTER.register, Block);
		const addedRoute = router.getRoute(ROUTER.register);
		expect(addedRoute?.getPathName()).to.equal(ROUTER.register);
	});

	it('должен вызывать _onRoute при переходе на новый маршрут', async () => {
		const onRouteSpy = sinon.spy(router, '_onRoute');
		router.use(ROUTER.register, Block);

		router.go(ROUTER.register);
		expect(onRouteSpy.calledOnceWith(ROUTER.register)).to.be.true;
	});

	it('должен вызывать checkLoginUser перед рендером маршрута', async () => {
		router.use(ROUTER.register, Block);
		await router.go(ROUTER.register);
		expect(checkLoginUserStub.calledOnce).to.be.true;
	});

	it('должен вызывать history.back при вызове метода back', () => {
		const historyBackSpy = sinon.spy(window.history, 'back');
		router.back();
		expect(historyBackSpy.calledOnce).to.be.true;
	});

	it('должен вызывать history.forward при вызове метода forward', () => {
		const historyForwardSpy = sinon.spy(window.history, 'forward');
		router.forward();
		expect(historyForwardSpy.calledOnce).to.be.true;
	});

	it('должен искать маршрут с методом getRoute', () => {
		router.use(ROUTER.register, Block);
		const matchedRoute = router.getRoute(ROUTER.register);
		expect(matchedRoute).to.equal(router.routes[0]);

		const fallbackRoute = router.getRoute('*');
		expect(fallbackRoute).to.be.undefined;
	});
});
