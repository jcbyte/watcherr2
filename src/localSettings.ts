export const ValidLocalSettingsList = ["dataStorage"] as const;
export type ValidLocalSettings = (typeof ValidLocalSettingsList)[number];
type SettingsObject = Record<ValidLocalSettings, string>;

export function getLocalSettings(): SettingsObject {
	let obj = Object.fromEntries(
		ValidLocalSettingsList.map((setting: ValidLocalSettings) => [setting, localStorage.getItem(setting)])
	);

	return obj as SettingsObject;
}

export function setLocalSettings(settings: Partial<SettingsObject>) {
	Object.entries(settings).forEach(([setting, value]) => {
		localStorage.setItem(setting, value);
	});
}
