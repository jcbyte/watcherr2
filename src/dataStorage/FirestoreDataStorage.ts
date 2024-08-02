import { ContentData } from "../types";
import DataStorage from "./DataStorage";

// TODO
export default class FirestoreDataStorage extends DataStorage {
	async getContentList(): Promise<ContentData[]> {
		return [];
	}

	async setContentList(contentList: ContentData[]): Promise<void> {}
}
