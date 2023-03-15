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
import React, { useEffect, useRef, useState } from "react";
import { StackActions } from "@react-navigation/routers";
import {
	getAuth,
	updateProfile,
	updateEmail,
	updatePassword,
	updatePhoneNumber,
	verifyBeforeUpdateEmail,
	RecaptchaVerifier,
	PhoneAuthProvider,
} from "firebase/auth";
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
import Clock from "../../components/Clock";

var d_width = Dimensions.get("window").width; //full width
var d_height = Dimensions.get("window").height; //full height

function HomeScreen({ states, setStates, ...props }) {
	const auth = getAuth();
	const user = auth.currentUser;
	const db = getDatabase();
	const dbRef = ref(db);

	if (!user) {
		console.error("no access to home page");
		signOutAndReturnToLogin();
		return;
	}

	useEffect(() => {
		if (!states.firstSync) {
			setStates({ ...states, firstSync: true });
			onFirstSync();
		}
	}, [states]);

	// button configs
	const [stateNav, setStateNav] = useState(0);
	const btnJobSelectProps = {
		text: "Select a job to clock in..",
		spinCircleColor: "black",
		spinCircleColor: "#D0D0D0",
		style: { backgroundColor: "#D0D0D0" },
		onFinish: () => handleBigButtonOnFinish(),
	};
	const btnClockInProps = {
		text: "Press to clock in~",
		// spinCircleColor: "#707070",
		spinCircleColor: "#D0D0D0",
		style: { backgroundColor: "#7CFF81" },
		onFinish: () => handleBigButtonOnFinish(),
	};
	const btnClockOutProps = {
		text: "Clock out now~!",
		spinCircleColor: "#D0D0D0",
		style: { backgroundColor: "#FF3939", color: "#FFFFFF" },
		onFinish: (e) => handleBigButtonOnFinish(e),
	};
	const [jobTitle, setJobTitle] = useState("");
	const btnJobSelect = <BigButton {...btnJobSelectProps} />;
	const btnClockIn = <BigButton {...btnClockInProps} title={jobTitle} />;
	const btnClockOut = <BigButton {...btnClockOutProps} />;
	const [showBigButton, setShowBigButton] = useState(true);

	const [mainComponent, setMainComponent] = useState(null);
	function handleBigButtonOnFinish(e) {
		setStateNav(stateNav + 1);
		console.log(e||undefined);
	}

	function handleJobSelection(result) {
		console.log(result);
	}

	const [jobData, setJobData] = useState({});

	const [selectedJob, setSelectedJob] = useState({});
	useEffect(() => {
		if (stateNav === 1) {
			// selecting job
			setMainComponent(
				<JobSelectionScreen
					jobData={jobData}
					removerShown={false}
					callback={(e) => {
						setShowBigButton(true);
						console.log("selected:\n", e.result.content);
						setSelectedJob(e.result.content);
						setJobTitle(e.result.content.title);
					}}
					{...props}
				/>
			);
			setShowBigButton(false);
		} else if (stateNav === 2) {
			setShowBigButton(true);
			// clock in screen
			setMainComponent(
				<View
					style={{
						flex: 1,
						alignItems: "center",
						paddingVertical: "5%",
						justifyContent: "space-evenly",
					}}>
					<Clock child={BigButton} childProps={btnClockOutProps} job={selectedJob}>
					</Clock>
				</View>
			);
			setShowBigButton(false);
		} else if (stateNav === 3) {
			// clock out screen
			setMainComponent(
				<Text onPress={() => setShowBigButton(true)}>Next</Text>
			);
			setShowBigButton(false);
			setStateNav(0);
		}
	}, [stateNav, states]);

	useEffect(() => {
		// console.log(showBigButton);
	}, [showBigButton]);

	// user configs
	const [displayName, setDisplayName] = useState(user.displayName);
	const [email, setEmail] = useState(user.email);
	const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
	const [photoURL, setPhotoURL] = useState(user.photoURL);

	async function signOutAndReturnToLogin() {
		console.log("logged out!");
		auth.signOut().then(() => {
			props.navigation.replace("Sign In");
		});
	}

	async function onFirstSync() {
		// fetch job data from server
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
				props.ShowAlert("Error: could not fetch data from server!");
				console.error(error);
			})
			.finally(() => {});
	}

	return (
		<View
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				paddingBottom: 24,
				height: "100%",
			}}>
			{showBigButton
				? stateNav === 0
					? btnJobSelect
					: stateNav === 1
					? btnClockIn
					: btnClockOut
				: mainComponent}
			{/* <BottomTabs /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		marginBottom: 20,
		width: "100%",
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderRadius: 24,
		borderColor: "#00000030",
		backgroundColor: "white",
		fontFamily: "Maitree",
		fontSize: 12,
	},
});

export { HomeScreen };
