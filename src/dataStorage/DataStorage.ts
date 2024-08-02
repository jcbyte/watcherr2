import { ContentData, DataStorageLocations } from "../types";

export abstract class DataStorage {
	abstract getContentList(): Promise<ContentData[]>;
	abstract setContentList(contentList: ContentData[]): Promise<void>;
}

const LOCAL_STORAGE_CONTENT_NAME = "contentList";

export class LocalDataStorage extends DataStorage {
	async getContentList(): Promise<ContentData[]> {
		let contentList = localStorage.getItem(LOCAL_STORAGE_CONTENT_NAME);
		if (!contentList) return [];
		return JSON.parse(contentList) as ContentData[];
	}

	async setContentList(contentList: ContentData[]): Promise<void> {
		localStorage.setItem(LOCAL_STORAGE_CONTENT_NAME, JSON.stringify(contentList));
	}
}

export class FirestoreDataStorage extends DataStorage {
	async getContentList(): Promise<ContentData[]> {
		return [];
	}

	async setContentList(contentList: ContentData[]): Promise<void> {}
}

export const dataStorageRef: Record<DataStorageLocations, new () => DataStorage> = {
	local: LocalDataStorage,
	firestore: FirestoreDataStorage,
};
