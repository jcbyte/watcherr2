import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#5e35b1",
		},
		secondary: {
			main: "#3949ab",
		},
		error: {
			main: "#e53935",
		},
		warning: {
			main: "#fb8c00",
		},
		info: {
			main: "#757575",
		},
		success: {
			main: "#43a047",
		},
		background: {
			default: "#1e1e1e",
		},
		text: {
			primary: "#dcdcdc",
			secondary: "rgba(220,220,220,0.7)",
			disabled: "rgba(220,220,220,0.5)",
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
