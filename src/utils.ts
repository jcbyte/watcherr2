import { ContentData } from "./types";

export function validateContent(content: ContentData): boolean {
	if (content.name === "") return false;

	return true;
}

export function deepCopy<T>(object: T): T {
	return JSON.parse(JSON.stringify(object));
}
