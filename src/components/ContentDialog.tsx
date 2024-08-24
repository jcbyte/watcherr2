import { Button, Checkbox, Collapse, Dialog, FormControlLabel, Slide, TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect } from "react";
import { DEFAULT_CONTENT } from "../static";
import { ContentData } from "../types";
import { validateContentData } from "../utils/utils";
import { useSnackbarAlert } from "./SnackbarAlertProvider";

const DialogTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContentDialog({
	dialogOpen,
	closeDialog,
	saveDialogChanges,
	dialogFor,
	contentList,
}: {
	dialogOpen: boolean;
	closeDialog: () => void;
	saveDialogChanges: (contentData: ContentData) => void;
	dialogFor: number;
	contentList: ContentData[];
}) {
	const [workingContentData, setWorkingContentData] = React.useState<ContentData>(DEFAULT_CONTENT);

	const { showAlert } = useSnackbarAlert();

	useEffect(() => {
		if (dialogOpen) setWorkingContentData(dialogFor >= 0 ? contentList[dialogFor] : DEFAULT_CONTENT);
	}, [dialogOpen]);

	return (
		<>
			<Dialog open={dialogOpen} onClose={closeDialog} TransitionComponent={DialogTransition} fullWidth>
				<div className="bg-background flex flex-col p-2 gap-2">
					<TextField
						value={workingContentData.name}
						onChange={(newValue) => {
							setWorkingContentData((prev) => {
								let newWorkingContentData: ContentData = { ...prev, name: newValue.target.value };
								return newWorkingContentData;
							});
						}}
						variant="outlined"
						type="text"
						label="Title"
						color="secondary"
					/>
					<TextField
						value={workingContentData.link ?? ""}
						onChange={(newValue) => {
							setWorkingContentData((prev) => {
								let newWorkingContentData: ContentData = { ...prev, link: newValue.target.value };
								return newWorkingContentData;
							});
						}}
						variant="outlined"
						type="url"
						label="Link"
						color="secondary"
					/>
					<div className="flex items-center h-14 gap-2">
						<FormControlLabel
							control={
								<Checkbox
									checked={workingContentData.type === "Show"}
									onChange={(newValue) => {
										setWorkingContentData((prev) => {
											let newWorkingContentData: ContentData = {
												...prev,
												type: newValue.target.checked ? "Show" : "Film",
												// Include season and episode numbers here so that if changed to a show these will initialise at 1
												season: 1,
												episode: 1,
											};
											return newWorkingContentData;
										});
									}}
									color="secondary"
								/>
							}
							label="Series"
						/>
						<Collapse in={workingContentData.type === "Show"}>
							<TextField
								value={workingContentData.season ?? 0}
								onChange={(newValue) => {
									setWorkingContentData((prev) => {
										let newWorkingContentData: ContentData = { ...prev, season: Number(newValue.target.value) };
										return newWorkingContentData;
									});
								}}
								type="number"
								variant="standard"
								label="Season"
								color="secondary"
								className="w-20"
							/>
							<TextField
								value={workingContentData.episode ?? 0}
								onChange={(newValue) => {
									setWorkingContentData((prev) => {
										let newWorkingContentData: ContentData = { ...prev, episode: Number(newValue.target.value) };
										return newWorkingContentData;
									});
								}}
								type="number"
								variant="standard"
								label="Episode"
								color="secondary"
								className="w-20"
							/>
						</Collapse>
					</div>
					<div className="flex gap-2">
						<Button variant="outlined" className="basis-full" color="warning" onClick={closeDialog}>
							Cancel
						</Button>
						<Button
							variant="contained"
							className="basis-full"
							onClick={() => {
								if (validateContentData(workingContentData)) {
									saveDialogChanges(workingContentData);
								} else {
									showAlert("Cannot save this content.");
								}
							}}
							color="primary"
						>
							Save
						</Button>
					</div>
				</div>
			</Dialog>
		</>
	);
}
