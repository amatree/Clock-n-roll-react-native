import React, { useEffect, useState, lazy, Suspense } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	Keyboard,
	ScrollView,
} from "react-native";
import Task from "../../components/Task";

import { usePromise } from "../../components/PromiseHandle";
import { getAuth } from "firebase/auth";
import {
	getDatabase,
	ref,
	set,
	remove,
	child,
	get,
	update,
} from "firebase/database";

import { showModal } from "../../App";
import LoadingScreen from "../../components/LoadingScreen";
import { PopupModal } from "../../components/PopupModal";
import { LengthOf } from "../../utils/utils";

function TodoScreen({ states, setStates, ...props }) {
	const auth = getAuth();
	const user = auth.currentUser;
	const db = getDatabase();
	const dbRef = ref(db);

	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState({});
	const [hasUnsavedChange, setHasUnsavedChange] = useState(false);

	const [firstSync, setFirstSync] = useState(states.firstSync);

	const [modalStates, setModalStates] = useState({
		visible: false,
		message: "",
	});
	const [modalOptions, setModalOptions] = useState({
		type: "ync",
		child: undefined,
		onClose: () => {},
		onYes: () => {},
		onNo: () => {},
		onCancel: () => {},
		onOk: () => {},
		afterClose: () => {},
	});

	function ShowAlert(message, options = modalOptions) {
		setModalOptions({
			...modalOptions,
			...options,
		});
		setModalStates({
			...modalStates,
			message: message,
			visible: true,
		});
	}

	function saveToTaskItems(tasks) {
		setTaskItems(tasks);
		setStates({
			...states,
			taskItems: tasks,
		});
	}

	useEffect(() => {
		if (
			states.taskItems &&
			Object.keys(states.taskItems).length > Object.keys(taskItems).length
		) {
			saveToTaskItems(states.taskItems);
		}
	}, []);

	useEffect(() => {
		if (!states.firstSync) {
			get(child(dbRef, `users/${user.uid}/tasks`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						console.log(
							"[" + new Date().toLocaleString() + "] retrieved data from db"
						);
						saveToTaskItems(snapshot.val());
					}
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					setStates({
						...states,
						firstSync: true,
					});
				});
		}
	}, [states.firstSync]);

	useEffect(() => {
		let timer = null;
		if (hasUnsavedChange) {
			setHasUnsavedChange(false);
			handleWriteData();
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
				setHasUnsavedChange(false);
			}
		};
	}, [hasUnsavedChange]);

	const handleAddTask = () => {
		if (task == null) {
			if (LengthOf(taskItems) === 0) return;
			ShowAlert("Do you want to remove all tasks?", {
				type: "yn",
				onYes: () => {
					saveToTaskItems({});
					setHasUnsavedChange(true);
				},
			});
			return;
		}

		Keyboard.dismiss();

		var allItems = Object.keys(taskItems);
		var nextIdx = allItems[allItems.length - 1];
		if (nextIdx === undefined) nextIdx = 0;
		else nextIdx = Number(nextIdx.replace("Task", "")) + 1;
		var newTask = { ["Task" + nextIdx]: task };
		saveToTaskItems({ ...taskItems, ...newTask });
		setTask(null);
		setHasUnsavedChange(true);
	};

	const handleCompleteTask = (task) => {
		let itemsCopy = { ...taskItems };
		delete itemsCopy[task.key];
		saveToTaskItems(itemsCopy);
		setHasUnsavedChange(true);
	};

	async function handleWriteData() {
		const [r, err] = await usePromise(
			set(ref(db, "users/" + user.uid + "/tasks"), taskItems)
		);
		if (err) {
			alert(err.message);
		} else {
			console.log("[" + new Date().toLocaleString() + "] data synced!");
		}
	}

	if (!states.firstSync) {
		return <LoadingScreen text="Loading tasks..." />;
	}

	return (
		<>
			{modalStates.visible && (
				<PopupModal
					visible={modalStates.visible}
					message={modalStates.message}
					states={setModalStates}
					options={modalOptions}
				/>
			)}
			<View style={styles.container}>
				<View style={styles.tasksWrapper}>
					{/* <TouchableOpacity onPress={() => test()}><Text style={{textDecorationLine: "underline"}}>{"<Click to view items in console>"}</Text></TouchableOpacity> */}
					<Text style={styles.sectionTitle}>Today's tasks</Text>

					<ScrollView style={styles.items}>
						{Object.entries(taskItems).map((taskItem, idx) => {
							var key = taskItem[0];
							var value = taskItem[1];
							return (
								<TouchableOpacity
									key={key}
									onPress={() => handleCompleteTask({ key, value })}>
									<Task text={value} key={key} />
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.writeTaskWrapper}
					keyboardVerticalOffset={140}>
					<TextInput
						style={styles.input}
						placeholder={"Write a task"}
						value={task}
						onChangeText={(text) => setTask(text)}
						onSubmitEditing={() => handleAddTask()}
					/>
					<TouchableOpacity onPress={() => handleAddTask()}>
						<View style={styles.addWrapper}>
							<Text style={styles.addText}>+</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		</>
	);
}

export { TodoScreen };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E8EAED",
	},
	tasksWrapper: {
		paddingTop: 40,
		paddingHorizontal: 20,
		maxHeight: "80%",
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	items: {
		marginTop: 30,
	},
	writeTaskWrapper: {
		position: "absolute",
		bottom: 40,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: "white",
		borderRadius: 60,
		borderColor: "#C0C0C0",
		borderWidth: 1,
		width: 250,
		paddingLeft: 15,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: "white",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
	addText: {},
});
