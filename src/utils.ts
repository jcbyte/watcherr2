import { ContentData } from "./types";

export function validateContentData(content: ContentData): boolean {
	if (!content.name) return false;
	return true;
}
