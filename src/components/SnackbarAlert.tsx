import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export default function SnackbarAlert() {
	const [open, setOpen] = useState<boolean>(false);
	const [alertConfig, setAlertConfig] = useState<{ message: string; duration: number }>({
		message: "",
		duration: 4000,
	});

	function handleClose() {
		setOpen(false);
	}

	useEffect(() => {
		setTimeout(() => {
			console.log("open now");
			showAlert("hello world");
		}, 2000);
	}, []);

	// TODO this should be accessible from anywhere
	// Show the snackbar alert with configuration
	function showAlert(message: string, duration: number = 4000) {
		setAlertConfig({ message: message, duration: duration });
		setOpen(true);
	}

	// TODO match theme
	return (
		<Snackbar
			open={open}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			autoHideDuration={alertConfig.duration}
			onClose={handleClose}
			message={alertConfig.message}
		/>
	);
}
