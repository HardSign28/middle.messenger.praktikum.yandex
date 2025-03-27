export type DefaultProps = Record<string, unknown>;

export type InputProps = {
	name?: string;
	label?: string;
	className?: string,
	onChange?: (e: InputEvent) => void;
	onBlur?: (e: InputEvent) => void;
	events?: object,
	type?: string;
	id?: string;
	readonly?: boolean;
	value?: string;
	placeholder?: string;
};

