import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContentDialog from "./components/ContentDialog";
import ContentListItem, { ListAction } from "./components/ContentListItem";
import SelectAccountDialog from "./components/SelectAccountDialog";
import Signature from "./components/Signature";
import UserSelection from "./components/UserSelection";
import DataStorage from "./dataStorage/DataStorage";
import { auth } from "./firestore/firebase";
import { dataStorageRef } from "./static";
import { ContentData, DataStorageLocations, DataStorageLocationsList } from "./types";
import { getLocalSettings, setLocalSettings } from "./utils/localSettings";

export default function App() {
	const [dataStorage, setDataStorage] = useState<DataStorage | null>();

	const [contentList, setContentList] = useState<ContentData[]>([]);
	const [contentListLoaded, setContentListLoaded] = useState<boolean>(false);

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [dialogFor, setDialogFor] = useState<number>(-1);

	const [firebaseReady, setFirebaseReady] = useState<boolean>(false);
	const [isAuthed, setIsAuthed] = useState<boolean>(false);

	// For UserSelection
	const [selectedDataStorage, setSelectedDataStorage] = useState<DataStorageLocations | null>(null);

	// Load the content list from external storage
	function loadContentList() {
		if (!dataStorage) throw new Error("Data location not set");

		setContentListLoaded(false);
		dataStorage.getContentList().then((data) => {
			setContentList(data);
			setContentListLoaded(true);
		});
	}

	// function to set our data storage location
	function setStorageLocation(storageLocation: DataStorageLocations | null) {
		setLocalSettings({ dataStorage: storageLocation });
		setDataStorage(storageLocation ? new dataStorageRef[storageLocation]() : null);
	}

	// When storage location is set we reload the list from the new dataStorageLocation
	useEffect(() => {
		if (!dataStorage) return;

		loadContentList();
	}, [dataStorage]);

	const selectedDataStorage_firstUpdate = useRef(true);
	// When selected data location is changed we need to actually change it
	useEffect(() => {
		// Don't reset it to `null` on mount
		if (selectedDataStorage_firstUpdate.current) {
			selectedDataStorage_firstUpdate.current = false;
			return;
		}

		setStorageLocation(selectedDataStorage);
	}, [selectedDataStorage]);

	// Run on mount
	useEffect(() => {
		let localSettings = getLocalSettings();
		if (DataStorageLocationsList.includes(localSettings.dataStorage as DataStorageLocations)) {
			setSelectedDataStorage(localSettings.dataStorage as DataStorageLocations);
			setStorageLocation(localSettings.dataStorage as DataStorageLocations);
		}

		// Once firebase service is loaded the flag is set
		auth.authStateReady().then(() => {
			setFirebaseReady(true);
		});

		// Function to run when firebase auth change (user signs in/out)
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsAuthed(true);
			} else {
				setIsAuthed(false);
			}
		});
	}, []);

	// Save the content list to the external storage whenever it is modified
	useEffect(() => {
		if (!dataStorage) return;

		if (contentListLoaded) dataStorage.setContentList(contentList);
	}, [contentList]);

	// Opens the dialog and stores which item this is referencing (-1: new)
	function openDialog(openFor: number) {
		setDialogFor(openFor);
		setDialogOpen(true);
	}

	// Update the dialogFor with the new content or create a new item
	function saveDialogChanges(newContent: ContentData) {
		setContentList((prev) => {
			let newContentList = [...prev];

			if (dialogFor < 0) newContentList.push(newContent);
			else newContentList[dialogFor] = newContent;

			return newContentList;
		});

		setDialogOpen(false);
	}

	// Performs the function clicked from the list item
	function listFunction(action: ListAction, forContent: number) {
		switch (action) {
			// Open the dialog prefilling with this tickets details
			case "edit":
				openDialog(forContent);
				break;

			// Increase the episode counter by 1
			case "episode":
				setContentList((prev) => {
					let newContentList = [...prev];
					newContentList[forContent].episode!++;
					return newContentList;
				});
				break;

			// Increase the season counter by 1 and reset the episode counter to 1
			case "season":
				setContentList((prev) => {
					let newContentList = [...prev];
					newContentList[forContent].episode! = 1;
					newContentList[forContent].season!++;
					return newContentList;
				});
				break;

			// Remove the item from the list
			case "delete":
				setContentList((prev) => {
					let newContentList = [...prev];
					newContentList.splice(forContent, 1);
					return newContentList;
				});
				break;
		}
	}

	return (
		<>
			<div className="absolute top-2 right-2">
				<UserSelection
					selectedOption={selectedDataStorage}
					setSelectedOption={setSelectedDataStorage}
					isAuthed={isAuthed}
				/>
			</div>

			<div className="max-w-3xl m-auto">
				<div className="flex flex-col gap-2 m-2">
					<span className="shinyText text-4xl font-medium text-center m-4">Watchrr2</span>
					{contentList.map((content, i) => {
						return (
							<ContentListItem
								key={i}
								content={content}
								listFunction={(action: ListAction) => {
									listFunction(action, i);
								}}
							/>
						);
					})}

					<Button
						variant="contained"
						className="!mt-2"
						color="info"
						onClick={() => {
							openDialog(-1);
						}}
					>
						<AddIcon />
					</Button>
				</div>
			</div>

			<ContentDialog
				dialogOpen={dialogOpen}
				closeDialog={() => {
					setDialogOpen(false);
				}}
				saveDialogChanges={saveDialogChanges}
				dialogFor={dialogFor}
				contentList={contentList}
			/>

			<SelectAccountDialog isAuthed={isAuthed} />

			<div className="fixed left-1 bottom-1">
				<IconButton size="large" disabled={!contentListLoaded} onClick={loadContentList}>
					<RefreshIcon />
				</IconButton>
			</div>

			<Signature />
		</>
	);
}
