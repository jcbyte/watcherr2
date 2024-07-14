export type ContentType = "Film" | "Show";

export type ContentData = { type: ContentType; name: string; link: string; time: number } & (
	| { type: "Film" }
	| { type: "Show"; season: number; episode: number }
);
