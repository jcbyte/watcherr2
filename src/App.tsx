import { useState } from "react";
import { ContentData } from "./types";

export default function App() {
	const [contentList, setContentList] = useState<ContentData[]>([]);

	return <div className="text-teal-800">Watcherr2</div>;
}
