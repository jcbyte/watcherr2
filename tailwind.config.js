import { COLORS } from "./src/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: COLORS,
		},
	},
	plugins: [],
};
export { COLORS as COLOURS };
