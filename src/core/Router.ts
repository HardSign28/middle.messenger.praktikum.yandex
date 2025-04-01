import Block from '@/core/block';
import * as authServices from '@/services/auth';
import Route from './Route';

export interface RouteInterface {
	render: () => void;
	match: (path: string) => boolean;
	leave: () => void;
}

class Router {
	public routes: RouteInterface[] = [];

	private history: History | undefined;

	private _rootQuery!: string;

	private _currentRoute: RouteInterface | null = null;

	// eslint-disable-next-line no-use-before-define
	private static __instance: Router | null = null;

	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, block: typeof Block) {
		const route = new Route(pathname, block, {
			rootQuery: this._rootQuery,
		});
		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = (event: PopStateEvent) => {
			const currentTarget = event.currentTarget as Window | null;
			if (currentTarget) {
				this._onRoute(currentTarget.location.pathname);
			}
		};
		this._onRoute(window.location.pathname);
	}

	async _onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (!route) {
			return;
		}

		await authServices.checkLoginUser();

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	go(pathname: string) {
		if (this.history) {
			this.history.pushState({}, '', pathname);
		} else {
			throw new Error('History is undefined');
		}
		this._onRoute(pathname);
	}

	back() {
		if (this.history) {
			this.history.back();
		} else {
			throw new Error('History is undefined');
		}
	}

	forward() {
		if (this.history) {
			this.history.forward();
		} else {
			throw new Error('History is undefined');
		}
	}

	getRoute(pathname: string) {
		const matchedRoute = this.routes.find((route) => route.match(pathname));
		if (!matchedRoute) {
			return this.routes.find((fallbackRoute) => fallbackRoute.match('*'));
		}
		return matchedRoute;
	}
}

export default Router;
