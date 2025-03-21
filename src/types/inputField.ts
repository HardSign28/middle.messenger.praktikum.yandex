export type InputFieldProps = {
	label?: string;
	class?: string;
	error?: string;
	readonly?: boolean;
	onChange?: (e: InputEvent) => void;
	onBlur?: (e: InputEvent) => void;
	id?: string;
	type?: string;
	value?: string;
	name?: string;
};
