export type DialogAddProps = {
	onOk?: (callback: number) => void;
	onCancel?: () => void;
}

export type DialogAddChatProps = {
	onOk: (callback: unknown) => void;
	onCancel?: () => void;
}
export type DialogChatUsersProps = {
	onOk?: (userId: number) => void;
	onCancel: () => void;
}

export type DialogRemoveProps = {
	onOk?: (callback: number) => void;
	onCancel?: () => void;
	userName?: string;
}

export type DialogUploadProps = {
	onOk?: () => void;
	onCancel?: () => void;
}

export type DialogPasswordProps = {
	onOk: (callback: unknown) => void;
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
