import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { COLORS } from "./theme";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: COLORS["purple-dark"],
		},
		secondary: {
			main: COLORS["purple-light"],
		},
		warning: {
			main: COLORS.warning,
		},
		info: {
			main: COLORS.button,
		},
		background: {
			default: COLORS.background,
		},
	},
	typography: {
		button: {
			textTransform: "none",
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
