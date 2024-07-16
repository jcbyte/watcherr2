import AddIcon from "@mui/icons-material/Add";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ContentDialog from "./components/ContentDialog";
import ContentListItem from "./components/ContentListItem";
import Signature from "./components/Signature";
import { DEFAULT_CONTENT } from "./static";
import { ContentData } from "./types";

export default function App() {
	const [contentList, setContentList] = useState<ContentData[]>([]);
	const [contentListLoaded, setContentListLoaded] = useState<boolean>(false);

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [dialogFor, setDialogFor] = useState<number>(-1);

	useEffect(() => {
		loadContent();
	}, []);

	// Load the content list from external storage // TODO
	function loadContent() {
		setContentList([
			{ type: "Film", name: "film1", link: undefined, time: undefined },
			{ type: "Film", name: "film2", link: "filmlink", time: 4 },
			{ type: "Show", name: "show1", link: undefined, time: 23, season: 1, episode: 2 },
			{ type: "Show", name: "show2", link: "showlink", time: undefined, season: 3, episode: 14 },
		]);
		setContentListLoaded(true);
	}

	// Opens the dialog and stores which element opened this (-1: new)
	function openDialog(openFor: number) {
		setDialogFor(dialogFor);
		setDialogOpen(true);
	}

	function saveDialogChanges(newContent: ContentData) {
		console.log("// TODO");
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

				<Button
					variant="contained"
					className="!mt-2"
					color="info"
					disabled={!contentListLoaded}
					onClick={() => {
						openDialog(-1);
					}}
				>
					<AddIcon />
				</Button>
			</div>

			<ContentDialog
				dialogOpen={dialogOpen}
				closeDialog={() => {
					setDialogOpen(false);
				}}
				saveDialogChanges={saveDialogChanges}
				initialDialogContent={dialogFor >= 0 ? contentList[dialogFor] : DEFAULT_CONTENT}
			/>

			{/* <Dialog
				open={dialogOpen}
				onClose={() => {
					setDialogOpen(false);
				}}
				TransitionComponent={DialogTransition}
			>
				<Box bgcolor="#1e1e1e">
				</Box>
			</Dialog> */}

			{/* // TODO this can be in separate component in future
      <Box sx={{ position: "absolute", left: "6px", bottom: "2px" }}> 
				<IconButton size="large" disabled={!contentListLoaded} onClick={() => {}}>
					<RefreshIcon />
				</IconButton>
			</Box> */}

			<Signature />
		</>
	);
}
