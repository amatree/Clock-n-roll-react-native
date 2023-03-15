import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
	Button,
} from "react-native";
import React, {
	Component,
	useEffect,
	useRef,
	useState,
	useCallback,
} from "react";
import { StackActions } from "@react-navigation/routers";
import { getAuth } from "firebase/auth";
import {
	getDatabase,
	ref,
	set,
	remove,
	child,
	get,
	update,
	onValue,
} from "firebase/database";
import { usePromise } from "../../components/PromiseHandle";

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	withRepeat,
	withSpring,
	interpolate,
	withSequence,
	EasingNode,
	cancelAnimation,
} from "react-native-reanimated";

import BigButton from "../../components/BigButton";
import { JobCard, JobSelectionScreen } from "../../components/JobSelection";
import { getIcon } from "../../utils";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import { JobCreateForm } from "../../components/JobCreateForm";

const Stack = createStackNavigator();
export const JobCreateScreenSteps = [
	"JobMain",
	"AddJobStep1",
	"AddJobStep2",
	"AddJobStep3",
];

function AllJobsScreen({ states, setStates, ...props }) {
	// console.log(props);

	const auth = getAuth();
	const user = auth.currentUser;
	const db = getDatabase();
	const dbRef = ref(db);
	const jobsRef = ref(db, "users/" + user.uid + "/jobs");

	const [jobData, setJobData] = useState({});
	const [hasUnsavedChange, setHasUnsavedChange] = useState(false);
	const [shouldRefresh, setShouldRefresh] = useState(false);

	async function handleWriteData() {
		const [r, err] = await usePromise(
			set(ref(db, "users/" + user.uid + "/jobs"), jobData)
		);
		if (err) {
			alert(err.message);
		} else {
			console.log("[" + new Date().toLocaleString() + "] job data synced!");
		}
	}

	function handleAddJobData(job) {
		var allJobs = Object.keys(jobData);
		var nextIdx = allJobs[allJobs.length - 1];
		if (nextIdx === undefined) nextIdx = 0;
		else nextIdx = Number(nextIdx.replace("Job", "")) + 1;
		var newJobData = { ["Job" + nextIdx]: job };
		setJobData({ ...jobData, ...newJobData });
		setHasUnsavedChange(true);
	}

	// listen for db changes
	// useEffect(() => {
	// 	onValue(jobsRef, (snapshot) => {
	// 		const data = snapshot.val();
	// 		if (snapshot.exists()) setJobData(data);
	// 	})
	// }, [])

	useEffect(() => {
		if (!states.firstSync || shouldRefresh) {
			get(child(dbRef, `users/${user.uid}/jobs`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						console.log(
							"[" + new Date().toLocaleString() + "] retrieved job data from db"
						);
						setJobData(snapshot.val());
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
					setShouldRefresh(false);
				});
		}
	}, [states.firstSync, shouldRefresh]);

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

	function setCurrNavName(name = JobCreateScreenSteps[0]) {
		if (name === JobCreateScreenSteps[0]) {
			resetHeader();
		}
	}

	function resetHeader() {
		props.setOnHeaderBack({
			shown: props.navigation.canGoBack(),
			callback: () => {},
		});
	}

	function beforeLoadingStackScreen(navProps, i) {
		if (navProps === undefined) {
			resetHeader();
			return;
		}
		props.setOnHeaderBack({
			shown: i != 0,
			callback: () => {
				const iScreen = i - 1;
				if (!navProps.navigation.canGoBack() || iScreen <= 0) {
					resetHeader();
				}
				if (navProps.navigation.canGoBack()) {
					beforeLoadingStackScreen(navProps, iScreen);
					navProps.navigation.goBack();
				}
			},
		});
	}

	function mainScreen(navProps, props) {
		useEffect(() => {
			beforeLoadingStackScreen(undefined, 0);
		}, []);
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate(JobCreateScreenSteps[1]);
						}}
						style={styles.addJobButton}>
						<>
							{getIcon("plus-box-outline", "M", 24, {
								left: -10,
								top: -1,
								paddingHorizontal: 10,
							})}
							<Text>Add a job</Text>
						</>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							console.log("edit");
						}}
						style={styles.addJobButton}>
						<>
							{getIcon("pencil-outline", "M", 24, {
								left: -10,
								top: -1,
								paddingHorizontal: 10,
							})}
							<Text>Edit a job</Text>
						</>
					</TouchableOpacity>
				</View>
				<JobSelectionScreen
					jobData={jobData}
					onRefresh={() => {
						setShouldRefresh(true);
					}}
					onJobDeletion={(jobID) => {
						if (!Object.keys(jobData).includes(jobID)) {
							console.log("could not find", jobID, "in the database");
							return;
						}
						var jobsCopy = {...jobData};
						delete jobsCopy[jobID];
						setJobData(jobsCopy);
						setHasUnsavedChange(true);
						console.log("successfully deleted " + jobID);
					}}
					{...props}
				/>
			</View>
		);
	}

	// Job Create Form
	function addJobStep1(navProps, props) {
		useEffect(() => {
			setCurrNavName(JobCreateScreenSteps[1]);
			beforeLoadingStackScreen(navProps, 1);
		}, []);

		return (
			<>
				<JobCreateForm
					onNextStep={(jobObject) => {
						console.log("got:", jobObject);
						// props.ShowAlert("Title: " + jobObject.title + "\nDescription: " + jobObject.description + "\nWage: $" + jobObject.wage + "/hr");
						handleAddJobData(jobObject);
						navProps.navigation.navigate(JobCreateScreenSteps[2]);
					}}
					{...props}
				/>
			</>
		);
	}

	function addJobStep2(navProps, props) {
		useEffect(() => {
			setCurrNavName(JobCreateScreenSteps[2]);
			beforeLoadingStackScreen(navProps, 2);
		}, []);

		return (
			<View>
				<Text>Step 2</Text>
			</View>
		);
	}

	function addJobStep3(navProps, props) {
		useEffect(() => {
			setCurrNavName(JobCreateScreenSteps[3]);
			beforeLoadingStackScreen(navProps, 3);
		}, []);

		return (
			<View>
				<Text>Step 3</Text>
			</View>
		);
	}

	return (
		<Stack.Navigator
			initialRouteName="JobMain"
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="JobMain">
				{(navProps) => mainScreen(navProps, props)}
			</Stack.Screen>
			<Stack.Screen name={JobCreateScreenSteps[1]}>
				{(navProps) => addJobStep1(navProps, props)}
			</Stack.Screen>
			<Stack.Screen name={JobCreateScreenSteps[2]}>
				{(navProps) => addJobStep2(navProps, props)}
			</Stack.Screen>
			<Stack.Screen name={JobCreateScreenSteps[3]}>
				{(navProps) => addJobStep3(navProps, props)}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		marginHorizontal: 10,
	},
	alignRight: {
		flex: 1,
		alignItems: "flex-end",
	},
	alignLeft: {
		flex: 1,
		alignItems: "flex-start",
	},
	addJobButton: {
		alignItems: "center",
		margin: 10,
		padding: 10,
		paddingHorizontal: 30,
		backgroundColor: "white",
		borderRadius: 10,
		flexDirection: "row",
		elevation: 3,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 1,
	},
});

export { AllJobsScreen };
