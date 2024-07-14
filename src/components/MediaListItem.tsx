import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Grow, IconButton } from "@mui/material";
import { Media } from "../utils";

export default function MediaListItem({
	media,
	showDialog,
	updateMedia,
	deleteMedia,
}: {
	media: Media;
	showDialog: any;
	updateMedia: any;
	deleteMedia: any;
}) {
	function nextSeason() {
		var newMedia = { ...media };
		newMedia.mediaData.season += 1;
		newMedia.mediaData.episode = 1;

		updateMedia(newMedia);
	}

	function nextEpisode() {
		var newMedia = { ...media };
		newMedia.mediaData.episode += 1;

		updateMedia(newMedia);
	}

	return (
		<>
			<Grow in={true} mountOnEnter>
				<Box
					className="listItem"
					sx={{ display: "flex", alignItems: "center", p: "10px", borderRadius: "6px", width: "100%" }}
				>
					<Box
						sx={{
							fontSize: "20px",
							mr: "2px",
							whiteSpace: "nowrap",
							cursor: media.mediaData.link != "" ? "pointer" : "auto",
						}}
						onClick={() => {
							if (media.mediaData.link != "") {
								window.open(media.mediaData.link);
							}
						}}
					>
						{media.mediaData.name}
					</Box>
					<IconButton
						className="smallButton"
						sx={{ color: "#848484", alignSelf: "end" }}
						onClick={() => {
							showDialog(media);
						}}
					>
						<EditIcon fontSize="inherit" />
					</IconButton>
					{media.mediaType == "Series" ? (
						<>
							<Box
								className="seriesBox"
								bgcolor="primary.main"
								sx={{
									display: "flex",
									alignItems: "center",
									gap: "2px",
									height: "30px",
									borderRadius: "6px",
									ml: "10px",
									pl: "10px",
									pr: "10px",
									mr: "4px",
								}}
							>
								<Box sx={{ fontSize: "18px" }}>S{media.mediaData.season}</Box>
								<Box sx={{ fontSize: "18px" }}>E{media.mediaData.episode}</Box>
							</Box>
							<Button className="bigButton" variant="contained" color="info" sx={{ mr: "4px" }} onClick={nextEpisode}>
								<AddIcon fontSize="inherit" />
							</Button>
							<Button className="bigButton" variant="contained" color="info" onClick={nextSeason}>
								<NavigateNextIcon fontSize="inherit" />
							</Button>
						</>
					) : (
						<></>
					)}
					<Box sx={{ flex: 1 }}></Box>
					<Button
						className="bigButton"
						variant="contained"
						color="warning"
						onClick={() => {
							deleteMedia(media);
						}}
					>
						<DeleteOutlineIcon fontSize="inherit" />
					</Button>
				</Box>
			</Grow>
		</>
	);
}
