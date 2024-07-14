import { VERSION } from "../static";

export default function Signature() {
	return (
		<div className="text-zinc-500 fixed right-2 bottom-2 text-right text-sm">
			<p>Watcherr2 {VERSION}</p>
			<p>By Joel Cutler</p>
		</div>
	);
}
