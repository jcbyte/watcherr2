export type ContentType = "Film" | "Show";

export type ContentData = {
	type: ContentType;
	name: string;
	link?: string;
	season?: number;
	episode?: number;
	time?: number;
};

export type DialogFor = "new" | number;

export type ListAction = "edit" | "episode" | "season" | "delete";
