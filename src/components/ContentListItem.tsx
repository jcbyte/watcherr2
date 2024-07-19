import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, Grow, IconButton } from "@mui/material";
import { ContentData } from "../types";

export type ListAction = "edit" | "episode" | "season" | "delete";

export default function ContentListItem({
	content,
	listFunction,
}: {
	content: ContentData;
	listFunction: (action: ListAction) => void;
}) {
	return (
		<>
			<Grow in={true} mountOnEnter>
				<div className="bg-item-background flex gap-2 items-center p-2 drop-shadow-md rounded w-full">
					<span
						className="text-xl whitespace-nowrap"
						style={{ cursor: content.link ? "pointer" : "auto" }}
						onClick={() => {
							if (content.link) {
								window.open(content.link);
							}
						}}
					>
						{content.name}
					</span>

					<IconButton
						className="h-4 w-4 !-ml-3 !text-sm self-end !text-zinc-500"
						onClick={() => {
							listFunction("edit");
						}}
					>
						<EditIcon fontSize="inherit" />
					</IconButton>

					{content.type === "Show" && (
						<div className="flex gap-1">
							<div className="bg-purple-dark flex items-center gap-1 h-8 px-2 drop-shadow-md rounded">
								<span className="text-lg">S{content.season}</span>
								<span className="text-lg">E{content.episode}</span>
							</div>

							<Button
								className="h-8 !min-w-8 w-8"
								variant="contained"
								color="info"
								onClick={() => {
									listFunction("episode");
								}}
							>
								<AddIcon fontSize="small" />
							</Button>
							<Button
								className="h-8 !min-w-8 w-8"
								variant="contained"
								color="info"
								onClick={() => {
									listFunction("season");
								}}
							>
								<NavigateNextIcon fontSize="small" />
							</Button>
						</div>
					)}
					<span className="grow" />
					<Button
						className="h-8 !min-w-8 w-8"
						variant="contained"
						color="warning"
						onClick={() => {
							listFunction("delete");
						}}
					>
						<DeleteOutlineIcon fontSize="small" />
					</Button>
				</div>
			</Grow>
		</>
	);
}
