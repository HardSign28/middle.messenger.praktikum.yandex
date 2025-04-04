import { expect } from 'chai';
import sinon from 'sinon';
import EventBus from './eventBus';

describe('EventBus', () => {
	const EVENT_1 = 'testEvent1';
	const EVENT_2 = 'testEvent2';
	let eventBus;

	beforeEach(() => {
		eventBus = new EventBus();
	});

	it('Проверка что подписанный обработчик отработает', () => {
		const handler = sinon.stub();
		const payloads = ['payload', 'payload1'];

		eventBus.on(EVENT_1, handler);

		eventBus.emit(EVENT_1, ...payloads);

		expect(handler.calledOnceWith(...payloads)).to.be.true;
	});

	it('Проверка что подписанный обработчик отработает только для своего события', () => {
		const handlerEvent1 = sinon.stub();
		const handlerEvent2 = sinon.stub();

		eventBus.on(EVENT_1, handlerEvent1);
		eventBus.on(EVENT_2, handlerEvent2);

		eventBus.emit(EVENT_1);

		expect(handlerEvent1.calledOnce).to.be.true;
		expect(handlerEvent2.calledOnce).to.be.false;

		handlerEvent1.reset();
		eventBus.emit(EVENT_2);

		expect(handlerEvent1.calledOnce).to.be.false;
		expect(handlerEvent2.calledOnce).to.be.true;
	});

	it('Проверка что отписанный обработчик не вызовется', () => {
		const handler = sinon.stub();
		eventBus.on(EVENT_1, handler);
		eventBus.off(EVENT_1, handler);

		eventBus.emit(EVENT_1);

		expect(handler.calledOnce).to.be.false;
	});

	it('Получаем ошибку если такого ивента не существует', () => {
		const handler = sinon.stub();
		expect(() => eventBus.off(EVENT_1, handler)).to.throw(`Нет события: ${EVENT_1}`);
	});
});
