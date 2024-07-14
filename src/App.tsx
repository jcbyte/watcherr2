import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, CircularProgress, Dialog, IconButton, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { Suspense, lazy, useEffect, useState } from "react";
import MediaListItem from "./components/MediaListItem";
import { Media, validateMedia } from "./utils";
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
	const [watchlist, setWatchlist] = useState<Media[]>([]);
	const [watchlistLoaded, setWatchlistLoaded] = useState<boolean>(false);

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [openingDialogData, setOpeningDialogData] = useState<undefined | Media>(undefined);

	function getIndexFromMedia(media: Media): number {
		if (media.id < 0) return -1;

		var index = watchlist.findIndex((e) => e.id == media.id);
		return index;
	}

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

	function showDialog(newDialogFor: Media | undefined) {
		setOpeningDialogData(newDialogFor);
		setDialogOpen(true);
	}

	function saveDialog(newMedia: Media) {
		if (validateMedia(newMedia)) {
			if (newMedia.id < 0) addMedia(newMedia);
			else updateMedia(newMedia);
		}

		closeDialog();
	}

	function closeDialog() {
		setDialogOpen(false);
	}

	function addMedia(newMedia: Media) {
		// newMedia.id = getNextId(watchlist);
		// addNewMediaAPI(newMedia);
		// var newWatchlist = [...watchlist];
		// newWatchlist.push(newMedia);
		// setWatchlist(newWatchlist);
	}

	function updateMedia(newMedia: Media) {
		// updateMediaDataAPI(newMedia);
		// var newWatchlist = [...watchlist];
		// var index = getIndexFromMedia(newMedia);
		// newWatchlist[index] = newMedia;
		// setWatchlist(newWatchlist);
	}

	function deleteMedia(media: Media) {
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
					Watchrr
				</Typography>
				{!watchlistLoaded ? (
					<CircularProgress sx={{ display: "block", margin: "auto" }} />
				) : (
					watchlist.map((v, i) => {
						return (
							<MediaListItem
								media={v}
								key={i}
								showDialog={showDialog}
								updateMedia={updateMedia}
								deleteMedia={deleteMedia}
							/>
						);
					})
				)}
			</Box>
			<Button
				className="newMediaButton"
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

			<Box sx={{ position: "absolute", right: "6px", bottom: "2px" }}>
				<Typography variant="subtitle1" color="info">
					By Joel Cutler
				</Typography>
			</Box>
		</>
	);
}
