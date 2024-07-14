import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import { ContentData } from "../types";

export default function ListItem({ content }: { content: ContentData }) {
	return (
		<Paper elevation={6} className="p-1">
			<div className="flex flex-row items-center gap-2">
				<Typography variant="body1">{content.name}</Typography>
				<IconButton size="small" className="self-end !text-[12px] !-ml-2">
					<EditIcon fontSize="inherit" />
				</IconButton>
				<span className="grow" />
				<Button variant="contained" color="error" className="!min-w-8 !p-0 aspect-square ">
					<DeleteOutlineIcon />
				</Button>
			</div>
		</Paper>
	);
}
