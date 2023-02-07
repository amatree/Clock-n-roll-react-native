import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from "../components/Task";

import { usePromise } from '../components/PromiseHandle';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from "firebase/database";

function TodoScreen ( props ) {
	const auth = getAuth();
	const user = auth.currentUser;
	const db = getDatabase();
	const dbRef = ref(db);

	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState({})
	const [hasUnsavedChange, setHasUnsavedChange] = useState(false);
	const [firstSync, setFirstSync] = useState(true);

	useEffect(() => {
		if (firstSync)
		{
			get(child(dbRef, `users/${user.uid}/tasks`)).then((snapshot) => {
				if (snapshot.exists()) {
					console.log("[" + new Date().toLocaleString() + "] retrieved data from db")
					setTaskItems(snapshot.val());
				}
			}).catch((error) => {
				console.error(error);
			});
			setFirstSync(false);
		}
	}, [firstSync])

	useEffect(() => {
		let timer = null;
		if (hasUnsavedChange)
		{
			handleWriteData();
			setHasUnsavedChange(false);
		}

		return () => {
			if (timer)
			{
				clearTimeout(timer);
				setHasUnsavedChange(false);
			}
		}
	}, [hasUnsavedChange])

	const handleAddTask = () => {
		if (task == null)
		{
			setTaskItems({});
			setHasUnsavedChange(true);
			return;
		}

		Keyboard.dismiss();

		var allItems = Object.keys(taskItems);
		var nextIdx = allItems[allItems.length - 1];
		if (nextIdx === undefined) nextIdx = 0;
		else nextIdx = Number(nextIdx.replace("Task", "")) + 1;
		var newTask = {["Task"+nextIdx]: task};
		setTaskItems({...taskItems, ...newTask});
		setTask(null);
		setHasUnsavedChange(true);
	}
	
	const handleCompleteTask = (task) => {
		let itemsCopy = {...taskItems};
		delete itemsCopy[task.key];
		setTaskItems(itemsCopy);
		setHasUnsavedChange(true);
	}

	function test() {
		console.log("======")
		console.log("length = " + Object.keys(taskItems).length)
		console.log(taskItems)
		console.log("======")
	}

	async function handleWriteData() {
		const [r, err] = await usePromise(set(ref(db, 'users/' + user.uid + '/tasks'), taskItems));
		if (err)
		{
			alert(err.message);
		} else {
			console.log("[" + new Date().toLocaleString() + "] data synced!")
		}
	}

	return (
		<View style={styles.container}>

			<View style={styles.tasksWrapper}>
				{/* <TouchableOpacity onPress={() => test()}><Text style={{textDecorationLine: "underline"}}>{"<Click to view items in console>"}</Text></TouchableOpacity> */}
				<Text style={styles.sectionTitle}>Today's tasks</Text>

				<ScrollView style={styles.items}>
					{
						Object.entries(taskItems).map((taskItem, idx) => {
							var key = taskItem[0]
							var value = taskItem[1]
							return (
								<TouchableOpacity key={key} onPress={() => handleCompleteTask({key, value})}>
									<Task text={value} key={key} />
								</TouchableOpacity>
							);
						})
					}
				</ScrollView>
			</View>

			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
				<TextInput style={styles.input} placeholder={"Write a task"} value={task} onChangeText={text => setTask(text)} onSubmitEditing={() => handleAddTask()} />
				<TouchableOpacity onPress={() => handleAddTask()}>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

export { 
	TodoScreen,
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#E8EAED"
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
		bottom: 20,
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