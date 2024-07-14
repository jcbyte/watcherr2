import { Box, Button, Checkbox, Collapse, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Media, deepCopy, defaultNewMedia } from "../utils";

export default function DialogContent({
	initialDialogData,
	dialogOpen,
	saveDialog,
	closeDialog,
}: {
	initialDialogData: Media | undefined;
	dialogOpen: boolean;
	saveDialog: any;
	closeDialog: any;
}) {
	const [dialogData, setDialogData] = React.useState<Media>(initialDialogData ?? deepCopy(defaultNewMedia));

	useEffect(() => {
		if (dialogOpen) {
			setDialogData(initialDialogData ?? deepCopy(defaultNewMedia));
		}
	}, [dialogOpen]);

	function handleNameChange(newName: string) {
		var newDialogData = { ...dialogData };
		newDialogData.mediaData.name = newName;
		setDialogData(newDialogData);
	}

	function handleLinkChange(newLink: string) {
		var newDialogData = { ...dialogData };
		newDialogData.mediaData.link = newLink;
		setDialogData(newDialogData);
	}

	function handleSeriesChange(newSeries: boolean) {
		var newDialogData = { ...dialogData };
		newDialogData.mediaType = newSeries ? "Series" : "Film";
		if (newSeries) newDialogData.mediaData = { ...newDialogData.mediaData, season: 1, episode: 1 };
		setDialogData(newDialogData);
	}

	function handleSeriesSeasonChange(newSeason: number) {
		var newDialogData = { ...dialogData };
		newDialogData.mediaData.season = newSeason;
		setDialogData(newDialogData);
	}

	function handleSeriesEpisodeChange(newEpisode: number) {
		var newDialogData = { ...dialogData };
		newDialogData.mediaData.episode = newEpisode;
		setDialogData(newDialogData);
	}

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<TextField
					value={dialogData.mediaData.name}
					onChange={(e) => {
						handleNameChange(e.target.value);
					}}
					variant="outlined"
					type="text"
					label="Title"
					color="secondary"
					sx={{ marginBottom: "10px" }}
				/>
				<TextField
					value={dialogData.mediaData.link}
					onChange={(e) => {
						handleLinkChange(e.target.value);
					}}
					variant="outlined"
					type="url"
					label="Link"
					color="secondary"
				/>
				<Box sx={{ display: "flex", alignItems: "center", height: "64px" }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={dialogData.mediaType == "Series"}
								onChange={(e) => handleSeriesChange(e.target.checked)}
								color="secondary"
							/>
						}
						label="Series"
					/>
					<Collapse in={dialogData.mediaType == "Series"}>
						<TextField
							value={dialogData.mediaData.season}
							onChange={(e) => handleSeriesSeasonChange(e.target.value as unknown as number)}
							type="number"
							variant="standard"
							label="Season"
							color="secondary"
							sx={{ width: "70px" }}
						/>
						<TextField
							value={dialogData.mediaData.episode}
							onChange={(e) => handleSeriesEpisodeChange(e.target.value as unknown as number)}
							type="number"
							variant="standard"
							label="Episode"
							color="secondary"
							sx={{ width: "70px" }}
						/>
					</Collapse>
				</Box>
				<Box sx={{ display: "flex", gap: "10px" }}>
					<Button variant="outlined" sx={{ flexBasis: "100%" }} color="warning" onClick={closeDialog}>
						Cancel
					</Button>
					<Button
						variant="contained"
						sx={{ flexBasis: "100%" }}
						onClick={() => {
							saveDialog(dialogData);
						}}
					>
						Save
					</Button>
				</Box>
			</Box>
		</>
	);
}
