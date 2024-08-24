import { doc, getDoc, setDoc } from "firebase/firestore";
import { ContentData } from "../types";
import { filterUndefined } from "../utils/utils";
import { auth, firestore, isAuth } from "./firebase";

// Check if this is the first time user is using watcherr2
async function isNewUser(): Promise<boolean> {
	// If the current user document exists then the user exists
	return await getDoc(doc(firestore, auth.currentUser!.uid, "main")).then((res) => !res.exists());
}

// If this is the first time the user is using watcherr2 then we will initialise there firestore
// Returns true if this was a new user
export async function initialiseNewUser(): Promise<boolean> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// If it is a new user then set up there firestore
	if (await isNewUser()) {
		await Promise.all([setDoc(doc(firestore, auth.currentUser!.uid, "main"), { contentList: [] })]);
		return true;
	}

	return false;
}

// Check that the firestore database is as expected and repair it if is not
// Returns true if a repair had to be done
export async function checkRepairFirestore(): Promise<boolean> {
	let mainData = await getDoc(doc(firestore, auth.currentUser!.uid, "main")).then((res) => {
		return res.data();
	});

	if (!mainData || !mainData.contentList) {
		await setDoc(doc(firestore, auth.currentUser!.uid, "main"), { contentList: [] });
		return true;
	}

	return false;
}

export async function getContentList(): Promise<ContentData[]> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	return await getDoc(doc(firestore, auth.currentUser!.uid, "main"))
		.then((res) => {
			return res.data()!.contentList as ContentData[];
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

export async function setContentList(contentList: ContentData[]): Promise<void> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	let processedContentList = contentList.map((content) => {
		return filterUndefined(content);
	});

	await setDoc(doc(firestore, auth.currentUser!.uid, "main"), {
		contentList: processedContentList,
	}).catch((err) => {
		throw new Error(err.message);
	});
}
