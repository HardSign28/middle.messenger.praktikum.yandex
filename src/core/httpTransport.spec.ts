import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport } from './http';
import { API_URL } from '@/constants';

describe('HTTPTransport', () => {
	let fetchStub: sinon.SinonStub;

	beforeEach(() => {
		fetchStub = sinon.stub(global, 'fetch');
	});

	afterEach(() => {
		fetchStub.restore();
	});

	it('должен отправить GET запрос на корректный URL с корректным методом', async () => {
		const transport = new HTTPTransport('/auth');
		const mockResponse = new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		fetchStub.resolves(mockResponse);

		await transport.get('/user');

		expect(fetchStub.calledOnce).to.be.true;
		const [url, options] = fetchStub.firstCall.args;
		expect(url).to.equal(`${API_URL}/auth/user`);
		expect(options.method).to.equal('GET');
	});

	it('должен отправить PUT запрос с корректными данными', async () => {
		const transport = new HTTPTransport('/auth');
		const mockResponse = new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		fetchStub.resolves(mockResponse);

		const updateData = { name: 'New Name' };
		await transport.put('/user', { data: updateData });

		const [, options] = fetchStub.firstCall.args;
		expect(options.method).to.equal('PUT');
		expect(options.body).to.equal(JSON.stringify(updateData));
	});

	it('должен отправить PATCH запрос с корректными данными', async () => {
		const transport = new HTTPTransport('/auth');
		const mockResponse = new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		fetchStub.resolves(mockResponse);

		const patchData = { email: 'new@mail.com' };
		await transport.patch('/user', { data: patchData });

		const [, options] = fetchStub.firstCall.args;
		expect(options.method).to.equal('PATCH');
		expect(options.body).to.equal(JSON.stringify(patchData));
	});

	it('должен установить Content-Type в application/json для запросов не с FormData', async () => {
		const transport = new HTTPTransport('/auth');
		const mockResponse = new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		fetchStub.resolves(mockResponse);

		await transport.post('/login', { data: { login: 'user', password: 'pass' } });

		const [, options] = fetchStub.firstCall.args;
		expect(options.headers.get('Content-Type')).to.equal('application/json');
	});

	it('не должен установить Content-Type для запросов с FormData', async () => {
		const transport = new HTTPTransport('/auth');
		const formData = new FormData();
		formData.append('file', new Blob(), 'test.txt');

		const mockResponse = new Response(JSON.stringify({ uploaded: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		fetchStub.resolves(mockResponse);

		await transport.post('/upload', { data: formData });

		const [, options] = fetchStub.firstCall.args;
		expect(options.headers.get('Content-Type')).to.be.null;
	});

	it('должен выбросить ошибку с response data если response не OK', async () => {
		const transport = new HTTPTransport('/auth');
		const mockResponse = new Response(JSON.stringify({ reason: 'Unauthorized' }), {
			status: 401,
			statusText: 'Unauthorized',
			headers: { 'Content-Type': 'application/json' },
		});
		fetchStub.resolves(mockResponse);

		try {
			await transport.get('/messenger');
		} catch (err: any) {
			expect(err.status).to.equal(401);
			expect(err.statusText).to.equal('Unauthorized');
			expect(err.data.reason).to.equal('Unauthorized');
		}
	});
});
