import { ContentData } from "../types";

export default abstract class DataStorage {
	abstract getContentList(): Promise<ContentData[]>;
	abstract setContentList(contentList: ContentData[]): Promise<void>;
}
