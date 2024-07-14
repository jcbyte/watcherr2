import AddIcon from "@mui/icons-material/Add";
import { Box, Button, CircularProgress, Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
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

	const [dialogOpen, setDialogOpen] = useState<boolean>(true);

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
			<div className="flex flex-col align-center gap-2 m-2">
				<span className="shinyText text-4xl font-medium text-center m-4">Watchrr2</span>
				{!contentListLoaded ? (
					<CircularProgress className="block m-auto" />
				) : (
					contentList.map((v, i) => {
						return <ContentListItem content={v} key={i} />;
					})
				)}

				<Button variant="contained" className="!mt-2" color="info" disabled={!contentListLoaded}>
					<AddIcon />
				</Button>
			</div>
			<Dialog
				open={dialogOpen}
				onClose={() => {
					setDialogOpen(false);
				}}
				TransitionComponent={DialogTransition}
			>
				<Box bgcolor="#1e1e1e">
					<DialogContent />
				</Box>
			</Dialog>
			{/* <Box sx={{ position: "absolute", left: "6px", bottom: "2px" }}>
				<IconButton size="large" disabled={!contentListLoaded} onClick={() => {}}>
					<RefreshIcon />
				</IconButton>
			</Box> */}
			{/* // TODO this can be in separate component in future */}
			<Signature />
		</>
	);
}
