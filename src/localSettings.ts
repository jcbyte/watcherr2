export const ValidLocalSettings = ["dataStorage"] as const;
export type ValidLocalSettingsType = (typeof ValidLocalSettings)[number];
type SettingsObject = Record<ValidLocalSettingsType, string>;

export function getLocalSettings(): SettingsObject {
	let obj = Object.fromEntries(
		ValidLocalSettings.map((setting: ValidLocalSettingsType) => [setting, localStorage.getItem(setting)])
	);

	return obj as SettingsObject;
}

export function setLocalSettings(settings: Partial<SettingsObject>) {
	Object.entries(settings).forEach(([setting, value]) => {
		localStorage.setItem(setting, value);
	});
}
