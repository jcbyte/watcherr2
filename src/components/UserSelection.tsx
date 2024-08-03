import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import { signInFirebaseGoogle, signOutFirebase } from "../firestore/firebase";
import { DataStorageLocations, DataStorageLocationsList } from "../types";
import { ACCOUNT_DISPLAY_FUNCTION } from "../utils/accountDisplayFunction";
import { getJSX } from "../utils/utils";

export default function UserSelection({
	selectedOption,
	setSelectedOption,
	isAuthed,
}: {
	selectedOption: DataStorageLocations | null;
	setSelectedOption: React.Dispatch<React.SetStateAction<DataStorageLocations | null>>;
	isAuthed: boolean;
}) {
	const [menuOpen, setMenuOpen] = useState<Boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement>();

	// ? this switch is very similar to the above is there a way to combine these into a single? or would this even make sense?
	function menuItemSelected(selectedStorageLocation: DataStorageLocations) {
		switch (selectedStorageLocation) {
			case "local":
				setSelectedOption(selectedStorageLocation);
				break;

			case "firestore":
				if (isAuthed) {
					if (selectedOption !== "firestore") {
						setSelectedOption(selectedStorageLocation);
					} else {
						signOutFirebase();
						setSelectedOption(null);
					}
				} else {
					signInFirebaseGoogle().then(() => {
						setSelectedOption(selectedStorageLocation);
					});
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
				<div className="flex gap-2">
					{selectedOption ? (
						getJSX(ACCOUNT_DISPLAY_FUNCTION[selectedOption].displaySelectionShown)
					) : (
						<span>Select Account</span>
					)}
				</div>
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(menuOpen)}
				onClose={() => {
					setMenuOpen(false);
				}}
			>
				{DataStorageLocationsList.map((option, index) => (
					<MenuItem
						key={index}
						// selected={index === selectedIndex}
						onClick={(e) => {
							menuItemSelected(option);
							setMenuOpen(false);
						}}
					>
						<div className="flex gap-2">
							{getJSX(ACCOUNT_DISPLAY_FUNCTION[option].displaySelectionMenu, [
								selectedOption,
								option === "firestore" && { isAuthed: isAuthed },
							])}
						</div>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
