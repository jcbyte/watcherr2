import { Snackbar } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarAlertContextType {
	showAlert: (message: string, duration?: number) => void;
}
const SnackbarAlertContext = createContext<SnackbarAlertContextType | undefined>(undefined);

// Custom hook to use the Snackbar context
export function useSnackbarAlert(): SnackbarAlertContextType {
	const context = useContext(SnackbarAlertContext);

	if (!context) {
		throw new Error("useSnackbarAlert must be used within a SnackbarAlertProvider");
	}

	return context;
}

export default function SnackbarAlertProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState<boolean>(false);
	const [alertConfig, setAlertConfig] = useState<{ message: string; duration: number }>({
		message: "",
		duration: 4000,
	});

	function handleClose() {
		setOpen(false);
	}

	// Show the snackbar alert with configuration
	function showAlert(message: string, duration: number = 4000) {
		setAlertConfig({ message: message, duration: duration });
		setOpen(true);
	}

	// TODO match theme
	return (
		<SnackbarAlertContext.Provider value={{ showAlert: showAlert }}>
			{children}
			<Snackbar
				open={open}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={alertConfig.duration}
				onClose={handleClose}
				message={alertConfig.message}
			/>
		</SnackbarAlertContext.Provider>
	);
}
