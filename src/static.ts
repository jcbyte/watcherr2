import DataStorage from "./dataStorage/DataStorage";
import FirestoreDataStorage from "./dataStorage/FirestoreDataStorage";
import LocalDataStorage from "./dataStorage/LocalDataStorage";
import { ContentData, DataStorageLocations } from "./types";

export const VERSION = "v2.0.1";

export const DEFAULT_CONTENT: ContentData = {
	type: "Film",
	name: "",
	link: undefined,
	time: undefined,
};

export const dataStorageRef: Record<DataStorageLocations, new () => DataStorage> = {
	local: LocalDataStorage,
	firestore: FirestoreDataStorage,
};
