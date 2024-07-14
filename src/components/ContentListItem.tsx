import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Grow, IconButton } from "@mui/material";
import { ContentData } from "../types";

export default function ContentListItem({ content }: { content: ContentData }) {
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
					<IconButton className="smallButton" sx={{ color: "#848484", alignSelf: "end" }} onClick={() => {}}>
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
							<Button className="bigButton" variant="contained" color="info" sx={{ mr: "4px" }}>
								<AddIcon fontSize="inherit" />
							</Button>
							<Button className="bigButton" variant="contained" color="info">
								<NavigateNextIcon fontSize="inherit" />
							</Button>
						</>
					) : (
						<></>
					)}
					<Box sx={{ flex: 1 }}></Box>
					<Button className="bigButton" variant="contained" color="warning" onClick={() => {}}>
						<DeleteOutlineIcon fontSize="inherit" />
					</Button>
				</Box>
			</Grow>
		</>
	);
}
