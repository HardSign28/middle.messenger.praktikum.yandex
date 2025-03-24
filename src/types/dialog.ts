export type DialogAddProps = {
	onOk?: () => void;
	onCancel?: () => void;
}

export type DialogRemoveProps = {
	onOk?: () => void;
	onCancel?: () => void;
	userName?: string;
}

export type DialogUploadProps = {
	onOk?: () => void;
	onCancel?: () => void;
}

export type DialogPasswordProps = {
	onOk?: (callback: unknown) => void;
	onCancel?: () => void;
}

export type DialogType = {
	labelOk?: string;
	labelCancel?: string;
	onOk?: () => void;
	onCancel?: () => void;
	title?: string;
	Body?: unknown;
}
