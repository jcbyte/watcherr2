import { Button, Dialog } from "@mui/material";
import { DataStorageLocations, DataStorageLocationsList } from "../types";
import { ACCOUNT_DISPLAY_FUNCTION } from "../utils/accountDisplayFunction";
import { getJSX } from "../utils/utils";

export default function SelectAccountDialog({
	selectedOption,
	setSelectedOption,
	isAuthed,
}: {
	selectedOption: DataStorageLocations | null;
	setSelectedOption: React.Dispatch<React.SetStateAction<DataStorageLocations | null>>;
	isAuthed: boolean;
}) {
	return (
		<>
			<Dialog open={!selectedOption} fullWidth>
				<div className="p-2">
					<span className="text-lg">Continue as:</span>
					<div className="flex gap-2 justify-center">
						{DataStorageLocationsList.map((option, index) => {
							return (
								<Button
									variant="contained"
									key={index}
									onClick={() => {
										ACCOUNT_DISPLAY_FUNCTION[option]
											.selectAccount({
												...(option === "firestore" && { signOut: false, isAuthed: isAuthed }),
											})
											.then((accepted) => {
												if (accepted) {
													setSelectedOption(option);
												}
											});
									}}
								>
									<div className="flex flex-col items-center">
										{getJSX(ACCOUNT_DISPLAY_FUNCTION[option].displayDialog, [
											option === "firestore" && { isAuthed: isAuthed },
										])}
									</div>
								</Button>
							);
						})}
					</div>
				</div>
			</Dialog>
		</>
	);
}
