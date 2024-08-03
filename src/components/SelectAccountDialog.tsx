import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Dialog } from "@mui/material";
import { DataStorageLocations, DataStorageLocationsList } from "../types";

export default function SelectAccountDialog() {
	// ? This again is similar to in user selection is there a way we can merge all of these
	function getLogoDisplay(location: DataStorageLocations) {
		function getLogoPartDisplay() {
			switch (location) {
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
							Sign in
						</>
					);
			}
		}

		return <div className="flex flex-col items-center">{getLogoPartDisplay()}</div>;
	}

	return (
		<>
			<Dialog open={true} fullWidth>
				<div className="p-2">
					<span className="text-lg">Continue as:</span>
					<div className="flex gap-2 justify-center">
						{DataStorageLocationsList.map((location) => {
							return <Button variant="contained">{getLogoDisplay(location)}</Button>;
						})}
					</div>
				</div>
			</Dialog>
		</>
	);
}
