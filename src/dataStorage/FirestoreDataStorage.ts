import { getContentList, setContentList } from "../firestore/db";
import { isAuth } from "../firestore/firebase";
import { ContentData } from "../types";
import DataStorage from "./DataStorage";

// TODO need to wait or do something if not authed

export default class FirestoreDataStorage extends DataStorage {
	async getContentList(): Promise<ContentData[]> {
		if (!isAuth()) {
			return [];
		}

		return getContentList();
	}

	async setContentList(contentList: ContentData[]): Promise<void> {
		if (!isAuth()) {
			return;
		}

		return setContentList(contentList);
	}
}
