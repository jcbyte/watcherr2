import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, CircularProgress, Dialog, IconButton, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { Suspense, useEffect, useState } from "react";
import ContentListItem from "./components/ContentListItem";
import DialogContent from "./components/DialogContent";
import Signature from "./components/Signature";
import { ContentData } from "./types";

const DialogTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
	const [contentList, setContentList] = useState<ContentData[]>([]);
	const [contentListLoaded, setContentListLoaded] = useState<boolean>(false);

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		loadContent();
	}, []);

	function loadContent() {
		setContentList([
			{ type: "Film", name: "film1", link: undefined, time: undefined },
			{ type: "Film", name: "film2", link: "filmlink", time: 4 },
			{ type: "Show", name: "show1", link: undefined, time: 23, season: 1, episode: 2 },
			{ type: "Show", name: "show2", link: "showlink", time: undefined, season: 3, episode: 14 },
		]);
		setContentListLoaded(true);
	}

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", m: "10px" }}>
				<Typography className="shinyText" sx={{ fontSize: "42px", fontWeight: 500 }}>
					Watchrr2
				</Typography>
				{!contentListLoaded ? (
					<CircularProgress sx={{ display: "block", margin: "auto" }} />
				) : (
					contentList.map((v, i) => {
						return <ContentListItem content={v} key={i} />;
					})
				)}
			</Box>
			<Button
				className="newContentButton"
				onClick={() => {
					//showDialog(undefined);
				}}
				variant="contained"
				color="info"
				sx={{ m: "10px", width: "calc(100% - 10px * 2)" }}
				disabled={!contentListLoaded}
			>
				<AddIcon />
			</Button>

			<Dialog
				open={dialogOpen}
				onClose={() => {
					setDialogOpen(false);
				}}
				TransitionComponent={DialogTransition}
				fullWidth
			>
				<Box bgcolor="#1e1e1e" sx={{ p: "10px", borderRadius: "6px" }}>
					<Suspense fallback={<CircularProgress sx={{ display: "block", margin: "auto" }} />}>
						<DialogContent />
					</Suspense>
				</Box>
			</Dialog>

			<Box sx={{ position: "absolute", left: "6px", bottom: "2px" }}>
				<IconButton size="large" disabled={!contentListLoaded} onClick={() => {}}>
					<RefreshIcon />
				</IconButton>
			</Box>

			<Signature />
		</>
	);
}
