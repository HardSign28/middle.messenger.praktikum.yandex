export type Page = {
	name: string;
	template: unknown;
	context?: Record<string, unknown>; // Теперь context не обязателен
};

export type Pages = Record<string, Page>;
