import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import Signature from "./components/Signature";
import { ContentData } from "./types";

// TODO create working version with no storage
// TODO add localstorage
// TODO add firestore

export default function App() {
	const [contentList, setContentList] = useState<ContentData[]>([]);

	useEffect(() => {
		setContentList([
			{ type: "Film", name: "film1", link: undefined, time: undefined },
			{ type: "Film", name: "film2", link: "filmlink", time: 4 },
			{ type: "Show", name: "show1", link: undefined, time: 23, season: 1, episode: 2 },
			{ type: "Show", name: "show2", link: "showlink", time: undefined, season: 3, episode: 14 },
		]);
	}, []);

	return (
		<>
			<Typography variant="h3" className="!m-5 text-center">
				Watcherr 2
			</Typography>

			<div className="p-2 gap-2 flex flex-col">
				{contentList.map((content: ContentData, i: number) => {
					return <ListItem key={i} content={content} />;
				})}

				<Button variant="contained" className="!mt-4">
					<AddIcon />
				</Button>
			</div>

			<Signature />
		</>
	);
}
