export type ContentType = "Film" | "Show";

// TODO add time
export type ContentData = {
	type: ContentType;
	name: string;
	link?: string;
	season?: number;
	episode?: number;
	time?: number;
};

export const DataStorageLocationsList = ["local", "firestore"] as const;
export type DataStorageLocations = (typeof DataStorageLocationsList)[number];
