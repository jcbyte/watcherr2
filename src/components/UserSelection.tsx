import { Button, Menu, MenuItem } from "@mui/material";
import { createRef, useEffect, useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import { DataStorageLocations } from "../types";

export default function UserSelection({
	setStorageLocation,
}: {
	setStorageLocation: (storageLocation: DataStorageLocations) => void;
}) {
	// TODO should not be set as local always on mount
	const [selectedOption, setSelectedOption] = useState(1);
	const [menuOpen, setMenuOpen] = useState<Boolean>(false);
	const anchorEl = createRef<HTMLElement>();

	const validOptions: DataStorageLocations[] = ["local", "firestore"];
	function getOptionDisplay(location: DataStorageLocations, type: "shown" | "menu"): JSX.Element {
		switch (location) {
			case "local":
				return (
					<>
						<PersonIcon />
						Guest
					</>
				);
			case "firestore":
				if (type === "shown")
					return (
						<>
							<GoogleIcon />
							Joel Cutler
						</>
					);
				else
					return (
						<>
							<GoogleIcon />
							Sign Out
						</>
					);
		}
	}

	function menuItemSelected(index: number) {
		setSelectedOption(index);
		setStorageLocation(validOptions[index]);
	}

	// ! There is an issue that anchorEl.current is apparently `null` when the menu tries to use it
	useEffect(() => {
		let siid = setInterval(() => {
			console.log(anchorEl.current);
		}, 1000);

		return () => {
			clearInterval(siid);
		};
	});

	return (
		<>
			<Button
				variant="outlined"
				onClick={() => {
					setMenuOpen(true);
				}}
				ref={anchorEl as React.RefObject<HTMLButtonElement>}
			>
				{getOptionDisplay(validOptions[selectedOption], "shown")}
			</Button>
			<Menu
				anchorEl={anchorEl.current}
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
							menuItemSelected(index);
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
