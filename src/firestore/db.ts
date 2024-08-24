import { doc, getDoc, setDoc } from "firebase/firestore";
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
