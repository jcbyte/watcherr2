import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import { auth, signInFirebaseGoogle, signOutFirebase } from "../firestore/firebase";
import { DataStorageLocations } from "../types";

interface AccountValues {
	displaySelectionShown: JSX.Element | ((options?: { [key: string]: any }) => JSX.Element);
	displaySelectionMenu:
		| JSX.Element
		| ((selectedOption: DataStorageLocations, options?: { [key: string]: any }) => JSX.Element);
	displayDialog: JSX.Element | ((options?: { [key: string]: any }) => JSX.Element);
	// TODO this probably should not return a boolean but throw if we cannot
	selectAccount: (options?: { [key: string]: any }) => Promise<boolean>;
}

function ProduceIconWithText(icon: JSX.Element, text: string): JSX.Element {
	return (
		<>
			{icon}
			<span>{text}</span>
		</>
	);
}

const LOCAL_DISPLAY_JSX: JSX.Element = ProduceIconWithText(<PersonIcon />, "Guest");
const FIRESTORE_DISPLAY_SIGN_IN: JSX.Element = ProduceIconWithText(<GoogleIcon />, "Sign In");
const FIRESTORE_DISPLAY_SIGN_OUT: JSX.Element = ProduceIconWithText(<GoogleIcon />, "Sign Out");
const FIRESTORE_DISPLAY_USER: () => JSX.Element = () =>
	ProduceIconWithText(
		<Avatar src={auth.currentUser?.photoURL ?? ""} className="!size-6" />,
		auth.currentUser?.displayName ?? "Unknown"
	);

export const ACCOUNT_DISPLAY_FUNCTION: Record<DataStorageLocations, AccountValues> = {
	local: {
		displaySelectionShown: LOCAL_DISPLAY_JSX,
		displaySelectionMenu: LOCAL_DISPLAY_JSX,
		displayDialog: LOCAL_DISPLAY_JSX,
		selectAccount: async () => {
			// This can always be set
			return true;
		},
	},

	firestore: {
		displaySelectionShown: FIRESTORE_DISPLAY_USER(),
		displaySelectionMenu: ((selectedOption: DataStorageLocations, options: { isAuthed: boolean }) => {
			if (options.isAuthed) {
				if (selectedOption !== "firestore") {
					return FIRESTORE_DISPLAY_USER();
				} else {
					return FIRESTORE_DISPLAY_SIGN_OUT;
				}
			} else {
				return FIRESTORE_DISPLAY_SIGN_IN;
			}
		}) as (selectedOption: DataStorageLocations, options?: { [key: string]: any }) => JSX.Element,
		displayDialog: ((options: { isAuthed: boolean }) => {
			if (options.isAuthed) {
				return FIRESTORE_DISPLAY_USER();
			} else {
				return FIRESTORE_DISPLAY_SIGN_IN;
			}
		}) as (options?: { [key: string]: any }) => JSX.Element,
		selectAccount: (async (options: { isAuthed: boolean; signOut: boolean }) => {
			if (options.signOut) {
				return signOutFirebase()
					.then(() => true)
					.catch(() => false);
			} else {
				if (options.isAuthed) {
					return true;
				} else {
					return signInFirebaseGoogle()
						.then(() => true)
						.catch(() => false);
				}
			}
		}) as (options?: { [key: string]: any }) => Promise<boolean>,
	},
};
