export type ButtonProps = {
	class?: string;
	type?: string;
	onClick?: (e: MouseEvent) => void;
	size?: string;
	label?: string;
}

export type BackButtonProps = {
	href?: string,
	onClick?: (e: InputEvent) => void;
	class?: string;
}
