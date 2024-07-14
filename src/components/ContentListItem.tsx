import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Grow, IconButton } from "@mui/material";
import { ContentData } from "../types";

export default function ContentListItem({
	content,
	showDialog,
	updateContent,
	deleteContent,
}: {
	content: ContentData;
	showDialog: any;
	updateContent: any;
	deleteContent: any;
}) {
	function nextSeason() {
		var newMedia = { ...content };

		if (newMedia.type == "Film") return; // TODO

		newMedia.season += 1;
		newMedia.episode = 1;

		updateContent(newMedia);
	}

	function nextEpisode() {
		var newMedia = { ...content };

		if (newMedia.type == "Film") return; // TODO

		newMedia.episode += 1;

		updateContent(newMedia);
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
							cursor: content.link != "" ? "pointer" : "auto",
						}}
						onClick={() => {
							if (content.link != "") {
								window.open(content.link);
							}
						}}
					>
						{content.name}
					</Box>
					<IconButton
						className="smallButton"
						sx={{ color: "#848484", alignSelf: "end" }}
						onClick={() => {
							showDialog(content);
						}}
					>
						<EditIcon fontSize="inherit" />
					</IconButton>
					{content.type == "Show" ? (
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
								<Box sx={{ fontSize: "18px" }}>S{content.season}</Box>
								<Box sx={{ fontSize: "18px" }}>E{content.episode}</Box>
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
							deleteContent(content);
						}}
					>
						<DeleteOutlineIcon fontSize="inherit" />
					</Button>
				</Box>
			</Grow>
		</>
	);
}
