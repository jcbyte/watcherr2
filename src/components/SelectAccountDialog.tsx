import { Button, Dialog } from "@mui/material";
import { DataStorageLocationsList } from "../types";
import { ACCOUNT_DISPLAY_FUNCTION } from "../utils/accountDisplayFunction";
import { getJSX } from "../utils/utils";

export default function SelectAccountDialog({ isAuthed }: { isAuthed: boolean }) {
	return (
		<>
			<Dialog open={false} fullWidth>
				<div className="p-2">
					<span className="text-lg">Continue as:</span>
					<div className="flex gap-2 justify-center">
						{DataStorageLocationsList.map((option, index) => {
							return (
								<Button variant="contained" key={index}>
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
