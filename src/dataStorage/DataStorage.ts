import { ContentData } from "../types";

export abstract class DataStorage {
	abstract getContentList(): Promise<ContentData[]>;
	abstract setContentList(contentList: ContentData[]): Promise<void>;
}

export class LocalDataStorage extends DataStorage {
	constructor() {
		super();
	}

	async getContentList(): Promise<ContentData[]> {
		return [];
	}

	async setContentList(contentList: ContentData[]): Promise<void> {}
}
