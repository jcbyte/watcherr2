import { ContentData } from "../types";
import DataStorage from "./DataStorage";

const LOCAL_STORAGE_CONTENT_NAME = "contentList";

export default class LocalDataStorage extends DataStorage {
	async getContentList(): Promise<ContentData[]> {
		let contentList = localStorage.getItem(LOCAL_STORAGE_CONTENT_NAME);
		if (!contentList) return [];
		return JSON.parse(contentList) as ContentData[];
	}

	async setContentList(contentList: ContentData[]): Promise<void> {
		localStorage.setItem(LOCAL_STORAGE_CONTENT_NAME, JSON.stringify(contentList));
	}
}
