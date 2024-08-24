import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import { DataStorageLocations, DataStorageLocationsList } from "../types";
import { ACCOUNT_DISPLAY_FUNCTION } from "../utils/accountDisplayFunction";
import { getJSX } from "../utils/utils";
import { useSnackbarAlert } from "./SnackbarAlertProvider";

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

	const { showAlert } = useSnackbarAlert();

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
						getJSX(ACCOUNT_DISPLAY_FUNCTION[selectedOption].displaySelectionShown, [
							selectedOption === "firestore" && { isAuthed: isAuthed },
						])
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
							ACCOUNT_DISPLAY_FUNCTION[option]
								.selectAccount({
									...(option === "firestore" && { signOut: selectedOption === "firestore", isAuthed: isAuthed }),
								})
								.then(() => {
									if (option === "firestore" && selectedOption === "firestore") {
										// In this case the user has signed out
										setSelectedOption(null);
										return;
									}

									setSelectedOption(option);
								})
								.catch((err) => {
									showAlert(err.message);
								});
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
