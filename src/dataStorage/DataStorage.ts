import { ContentData } from "../types";

const LOCAL_STORAGE_CONTENT_NAME = "contentList";

export abstract class DataStorage {
	abstract getContentList(): Promise<ContentData[]>;
	abstract setContentList(contentList: ContentData[]): Promise<void>;
}

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
