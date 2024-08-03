import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import { auth } from "../firestore/firebase";
import { DataStorageLocations } from "../types";

interface AccountValues {
	displaySelectionShown: JSX.Element | ((options?: { [key: string]: any }) => JSX.Element);
	displaySelectionMenu:
		| JSX.Element
		| ((selectedOption: DataStorageLocations, options?: { [key: string]: any }) => JSX.Element);
	displayDialog: JSX.Element | ((options?: { [key: string]: any }) => JSX.Element);
	selectAccount: (options?: { [key: string]: any }) => Promise<boolean>;
}

const LOCAL_DISPLAY_JSX = (
	<>
		<PersonIcon />
		<span>Guest</span>
	</>
);

const FIRESTORE_DISPLAY_SIGN_IN = (
	<>
		<GoogleIcon />
		<span>Sign in</span>
	</>
);

const FIRESTORE_DISPLAY_SIGN_OUT = (
	<>
		<GoogleIcon />
		<span>Sign out</span>
	</>
);

const FIRESTORE_DISPLAY_USER = (
	<>
		<Avatar src={auth.currentUser?.photoURL ?? ""} className="!size-6" />
		<span>{auth.currentUser?.displayName}</span>
	</>
);

export const ACCOUNT_DISPLAY_FUNCTION: Record<DataStorageLocations, AccountValues> = {
	local: {
		displaySelectionShown: LOCAL_DISPLAY_JSX,
		displaySelectionMenu: LOCAL_DISPLAY_JSX,
		displayDialog: LOCAL_DISPLAY_JSX,
		async selectAccount() {
			// TODO
			return true;
		},
	},

	firestore: {
		displaySelectionShown: FIRESTORE_DISPLAY_USER,
		displaySelectionMenu: ((selectedOption: DataStorageLocations, options: { isAuthed: boolean }) => {
			if (options.isAuthed) {
				if (selectedOption !== "firestore") {
					return FIRESTORE_DISPLAY_USER;
				} else {
					return FIRESTORE_DISPLAY_SIGN_OUT;
				}
			} else {
				return FIRESTORE_DISPLAY_SIGN_IN;
			}
		}) as (selectedOption: DataStorageLocations, options?: { [key: string]: any }) => JSX.Element,
		displayDialog: FIRESTORE_DISPLAY_SIGN_IN,
		async selectAccount() {
			// TODO
			return true;
		},
	},
};
