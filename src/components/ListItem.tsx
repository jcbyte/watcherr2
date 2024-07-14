import { Button, Paper, Typography } from "@mui/material";
import { ContentData } from "../types";

export default function ListItem({ content }: { content: ContentData }) {
	return (
		<Paper elevation={2} className="p-1">
			<div className="flex flex-row items-center">
				<Typography className="grow">{content.name}</Typography>
				<Button>~</Button>
				<Button>-</Button>
			</div>
		</Paper>
	);
}
