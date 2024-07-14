import { Box, Button, Checkbox, Collapse, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { DEFAULT_CONTENT } from "../static";
import { ContentData } from "../types";
import { deepCopy } from "../utils";

export default function DialogContent({}: {}) {
	const [dialogData, setDialogData] = React.useState<ContentData>(deepCopy(DEFAULT_CONTENT));

	return (
		<>
			<div className="flex flex-col p-2">
				<TextField
					value={dialogData.name}
					onChange={(e) => {}}
					variant="outlined"
					type="text"
					label="Title"
					color="secondary"
					sx={{ marginBottom: "10px" }}
				/>
				<TextField
					value={dialogData.link}
					onChange={(e) => {}}
					variant="outlined"
					type="url"
					label="Link"
					color="secondary"
				/>
				<Box sx={{ display: "flex", alignItems: "center", height: "64px" }}>
					<FormControlLabel
						control={<Checkbox checked={dialogData.type == "Show"} onChange={(e) => {}} color="secondary" />}
						label="Series"
					/>
					<Collapse in={dialogData.type == "Show"}>
						<TextField
							value={dialogData.type == "Show" ? dialogData.season : 0} // TODO Can this be done better
							onChange={(e) => {}}
							type="number"
							variant="standard"
							label="Season"
							color="secondary"
							sx={{ width: "70px" }}
						/>
						<TextField
							value={dialogData.type == "Show" ? dialogData.episode : 0} // TODO Can this be done better
							onChange={(e) => {}}
							type="number"
							variant="standard"
							label="Episode"
							color="secondary"
							sx={{ width: "70px" }}
						/>
					</Collapse>
				</Box>
				<Box sx={{ display: "flex", gap: "10px" }}>
					<Button variant="outlined" sx={{ flexBasis: "100%" }} color="warning" onClick={() => {}}>
						Cancel
					</Button>
					<Button variant="contained" sx={{ flexBasis: "100%" }} onClick={() => {}}>
						Save
					</Button>
				</Box>
			</div>
		</>
	);
}
