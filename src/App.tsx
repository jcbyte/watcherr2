import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ContentData } from "./types";

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
			<Button variant="contained">test</Button>
		</>
	);
}
