import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, CircularProgress, Dialog, IconButton, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { Suspense, lazy, useEffect, useState } from "react";
import ContentListItem from "./components/ContentListItem";
import Signature from "./components/Signature";
import { ContentData } from "./types";
import { validateContent } from "./utils";
const DialogContent = lazy(() => import("./components/DialogContent"));

const DialogTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
	const [watchlist, setWatchlist] = useState<ContentData[]>([]);
	const [watchlistLoaded, setWatchlistLoaded] = useState<boolean>(false);

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [openingDialogData, setOpeningDialogData] = useState<undefined | ContentData>(undefined);

	useEffect(() => {
		refreshMedia();
	}, []);

	function refreshMedia() {
		// setWatchlistLoaded(false);
		// getAllMediaAPI().then((data) => {
		// 	setWatchlist(data);
		// 	setWatchlistLoaded(true);
		// });
	}

	function showDialog(newDialogFor: ContentData | undefined) {
		setOpeningDialogData(newDialogFor);
		setDialogOpen(true);
	}

	function saveDialog(newContent: ContentData) {
		if (validateContent(newContent)) {
			// if (newContent.id < 0) addMedia(newContent);
			// else updateMedia(newContent);
		}

		closeDialog();
	}

	function closeDialog() {
		setDialogOpen(false);
	}

	function addContent(newMedia: ContentData) {
		// newMedia.id = getNextId(watchlist);
		// addNewMediaAPI(newMedia);
		// var newWatchlist = [...watchlist];
		// newWatchlist.push(newMedia);
		// setWatchlist(newWatchlist);
	}

	function updateContent(newMedia: ContentData) {
		// updateMediaDataAPI(newMedia);
		// var newWatchlist = [...watchlist];
		// var index = getIndexFromMedia(newMedia);
		// newWatchlist[index] = newMedia;
		// setWatchlist(newWatchlist);
	}

	function deleteContent(media: ContentData) {
		// deleteMediaAPI(media);
		// var newWatchlist = [...watchlist];
		// var index = getIndexFromMedia(media);
		// newWatchlist.splice(index, 1);
		// setWatchlist(newWatchlist);
	}

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", m: "10px" }}>
				<Typography className="shinyText" sx={{ fontSize: "42px", fontWeight: 500 }}>
					Watchrr2
				</Typography>
				{!watchlistLoaded ? (
					<CircularProgress sx={{ display: "block", margin: "auto" }} />
				) : (
					watchlist.map((v, i) => {
						return (
							<ContentListItem
								content={v}
								key={i}
								showDialog={showDialog}
								updateContent={updateContent}
								deleteContent={deleteContent}
							/>
						);
					})
				)}
			</Box>
			<Button
				className="neContentButton"
				onClick={() => {
					showDialog(undefined);
				}}
				variant="contained"
				color="info"
				sx={{ m: "10px", width: "calc(100% - 10px * 2)" }}
				disabled={!watchlistLoaded}
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
						<DialogContent
							initialDialogData={openingDialogData}
							dialogOpen={dialogOpen}
							saveDialog={saveDialog}
							closeDialog={closeDialog}
						/>
					</Suspense>
				</Box>
			</Dialog>

			<Box sx={{ position: "absolute", left: "6px", bottom: "2px" }}>
				<IconButton size="large" disabled={!watchlistLoaded} onClick={refreshMedia}>
					<RefreshIcon />
				</IconButton>
			</Box>

			<Signature />
		</>
	);
}
