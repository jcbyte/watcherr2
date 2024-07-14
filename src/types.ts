export type ContentType = "Film" | "Show";

export type ContentData = { type: ContentType; name: string; link: string | undefined; time: number | undefined } & (
	| { type: "Film" }
	| { type: "Show"; season: number; episode: number }
);

export type DialogFor = "new" | number;
