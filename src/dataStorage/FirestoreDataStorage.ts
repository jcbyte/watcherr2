import { getContentList, setContentList } from "../firestore/db";
import { isAuth } from "../firestore/firebase";
import { ContentData } from "../types";
import DataStorage from "./DataStorage";

export default class FirestoreDataStorage extends DataStorage {
	async getContentList(): Promise<ContentData[]> {
		// If we are not authed the list should not be shown anyway so just return empty
		if (!isAuth()) {
			return [];
		}

		return getContentList();
	}

	async setContentList(contentList: ContentData[]): Promise<void> {
		// If we are not authed the list should not be shown anyway so just return
		if (!isAuth()) {
			return;
		}

		return setContentList(contentList);
	}
}
