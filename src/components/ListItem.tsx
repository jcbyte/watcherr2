import { Paper } from "@mui/material";
import { ContentData } from "../types";

export default function ListItem({ content }: { content: ContentData }) {
	return (
		<div>
			<Paper elevation={2}>{content.name}</Paper>
		</div>
	);
}
