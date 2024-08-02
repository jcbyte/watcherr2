import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import { auth, signInFirebaseGoogle, signOutFirebase } from "../firestore/firebase";
import { DataStorageLocations } from "../types";

export default function UserSelection({
	setStorageLocation,
	isAuthed,
}: {
	setStorageLocation: (storageLocation: DataStorageLocations) => void;
	isAuthed: boolean;
}) {
	const [selectedOption, setSelectedOption] = useState<DataStorageLocations | null>(null);
	const [menuOpen, setMenuOpen] = useState<Boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement>();

	const validOptions: DataStorageLocations[] = ["local", "firestore"];
	function getOptionDisplay(location: DataStorageLocations | null, type: "shown" | "menu"): JSX.Element {
		function getOptionPartDisplay(): JSX.Element {
			switch (location) {
				case "local":
					return (
						<>
							<PersonIcon />
							<span>Guest</span>
						</>
					);

				case "firestore":
					if (type === "shown") {
						return (
							<>
								<Avatar src={auth.currentUser?.photoURL ?? ""} className="!size-6" />
								<span>{auth.currentUser?.displayName}</span>
							</>
						);
					} else {
						if (isAuthed) {
							if (selectedOption !== "firestore") {
								return (
									<>
										<Avatar src={auth.currentUser?.photoURL ?? ""} className="!size-6" />
										<span>{auth.currentUser?.displayName}</span>
									</>
								);
							} else {
								return (
									<>
										<GoogleIcon />
										<span>Sign Out</span>
									</>
								);
							}
						} else {
							return (
								<>
									<GoogleIcon />
									<span>Sign In</span>
								</>
							);
						}
					}

				default:
					return <>null</>;
			}
		}

		return <div className="flex gap-2">{getOptionPartDisplay()}</div>;
	}

	// ? this switch is very similar to the above is there a way to combine these into a single? or would this even make sense?
	function menuItemSelected(selectedStorageLocation: DataStorageLocations) {
		switch (selectedStorageLocation) {
			case "local":
				setSelectedOption(selectedStorageLocation);
				setStorageLocation(selectedStorageLocation);
				break;

			case "firestore":
				if (isAuthed) {
					if (selectedOption !== "firestore") {
						setSelectedOption(selectedStorageLocation);
						setStorageLocation(selectedStorageLocation);
					} else {
						signOutFirebase();
						setSelectedOption(null);
					}
				} else {
					signInFirebaseGoogle();
					setSelectedOption(selectedStorageLocation);
					setStorageLocation(selectedStorageLocation);
				}
				break;
		}
	}

	return (
		<>
			<Button
				variant="outlined"
				onClick={() => {
					setMenuOpen(true);
				}}
				ref={(ref) => {
					setAnchorEl(ref as HTMLButtonElement);
				}}
			>
				{getOptionDisplay(selectedOption, "shown")}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(menuOpen)}
				onClose={() => {
					setMenuOpen(false);
				}}
			>
				{validOptions.map((option, index) => (
					<MenuItem
						key={index}
						// selected={index === selectedIndex}
						onClick={(e) => {
							menuItemSelected(validOptions[index]);
							setMenuOpen(false);
						}}
					>
						{getOptionDisplay(option, "menu")}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
