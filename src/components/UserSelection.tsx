import { Button, Menu, MenuItem } from "@mui/material";
import { createRef, useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import { DataStorageLocations } from "../types";

export default function UserSelection() {
	const [selectedOption, setSelectedOption] = useState(1);
	const [menuOpen, setMenuOpen] = useState<Boolean>(false);
	const anchorEl = createRef<HTMLElement>();

	const validOptions: DataStorageLocations[] = ["local", "firestore"];
	function getMenuItem(type: DataStorageLocations): JSX.Element {
		switch (type) {
			case "local":
				return (
					<>
						<PersonIcon />
						Guest
					</>
				);
			case "firestore":
				return (
					<>
						<GoogleIcon />
						Sign In
					</>
				);
		}
	}

	return (
		<div>
			<Button
				variant="contained"
				onClick={() => {
					setMenuOpen(true);
				}}
				ref={anchorEl as React.RefObject<HTMLButtonElement>}
			>
				{validOptions[selectedOption]}
				{getMenuItem("local")}
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
						onClick={(event) => {
							setSelectedOption(index);
							setMenuOpen(false);
						}}
					>
						{getMenuItem(option)}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
