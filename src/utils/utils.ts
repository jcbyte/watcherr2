import { ContentData } from "../types";

export function validateContentData(content: ContentData): boolean {
	if (!content.name) return false;
	return true;
}

export function getJSX(x: JSX.Element | ((...args: any[]) => JSX.Element), args?: any[]): JSX.Element {
	if (typeof x === "function") {
		return x(...(args ?? []));
	} else return x;
}
