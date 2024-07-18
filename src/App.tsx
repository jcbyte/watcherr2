import AddIcon from "@mui/icons-material/Add";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ContentDialog from "./components/ContentDialog";
import ContentListItem, { ListAction } from "./components/ContentListItem";
import Signature from "./components/Signature";
import { ContentData } from "./types";

// TODO sync tailwind and mui themes and remove any constant colours

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

	// Opens the dialog and stores which item this is referencing (-1: new)
	function openDialog(openFor: number) {
		setDialogFor(openFor);
		setDialogOpen(true);
	}

	// Update the dialogFor with the new content or create a new item
	function saveDialogChanges(newContent: ContentData) {
		setContentList((prev) => {
			let newContentList = [...prev];

			if (dialogFor < 0) newContentList.push(newContent);
			else newContentList[dialogFor] = newContent;

			return newContentList;
		});

		setDialogOpen(false);
	}

	// Performs the function clicked from the list item
	function listFunction(action: ListAction, forContent: number) {
		switch (action) {
			// Open the dialog prefilling with this tickets details
			case "edit":
				openDialog(forContent);
				break;

			// Increase the episode counter by 1
			case "episode":
				setContentList((prev) => {
					let newContentList = [...prev];
					newContentList[forContent].episode!++;
					return newContentList;
				});
				break;

			// Increase the season counter by 1 and reset the episode counter to 1
			case "season":
				setContentList((prev) => {
					let newContentList = [...prev];
					newContentList[forContent].episode! = 1;
					newContentList[forContent].season!++;
					return newContentList;
				});
				break;

			// Remove the item from the list
			case "delete":
				setContentList((prev) => {
					let newContentList = [...prev];
					newContentList.splice(forContent, 1);
					return newContentList;
				});
				break;
		}
	}

	return (
		<>
			<div className="max-w-3xl m-auto">
				<div className="flex flex-col gap-2 m-2">
					<span className="shinyText text-4xl font-medium text-center m-4">Watchrr2</span>
					{!contentListLoaded ? (
						<CircularProgress className="block m-auto" />
					) : (
						contentList.map((content, i) => {
							return (
								<ContentListItem
									key={i}
									content={content}
									listFunction={(action: ListAction) => {
										listFunction(action, i);
									}}
								/>
							);
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
			</div>

			<ContentDialog
				dialogOpen={dialogOpen}
				closeDialog={() => {
					setDialogOpen(false);
				}}
				saveDialogChanges={saveDialogChanges}
				dialogFor={dialogFor}
				contentList={contentList}
			/>

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
