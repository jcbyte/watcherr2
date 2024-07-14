import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Paper, Typography } from "@mui/material";
import { ContentData } from "../types";

export default function ListItem({ content }: { content: ContentData }) {
	return (
		<Paper elevation={6} className="p-1">
			<div className="flex flex-row items-center gap-2">
				<Typography variant="body1" className="grow">
					{content.name}
				</Typography>
				<Button variant="contained" color="primary" className="!min-w-8 !p-0 aspect-square ">
					<EditIcon />
				</Button>
				<Button variant="contained" color="error" className="!min-w-8 !p-0 aspect-square ">
					<DeleteOutlineIcon />
				</Button>
			</div>
		</Paper>
	);
}
