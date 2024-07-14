export interface Media {
	id: number;
	mediaType: "Film" | "Series";
	mediaData: {
		name: string;
		link: string;

		season: number;
		episode: number;
	};
}

export function validateMedia(media: Media): boolean {
	if (media.mediaData.name == "") return false;

	return true;
}

export type DialogFor = "new" | number;

export const defaultNewMedia: Media = {
	id: -1,
	mediaData: { name: "", link: "", season: 1, episode: 1 },
	mediaType: "Film",
};

export function deepCopy<T>(object: T): T {
	return JSON.parse(JSON.stringify(object));
}

export function getNextId(watchlist: Media[]): number {
	var watchlistIds = watchlist.map((e) => e.id);
	var nextId = Math.max(...watchlistIds) + 1;
	return Math.max(nextId, 0);
}
