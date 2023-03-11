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
	const firstBtn = {
		text: "Select a job to clock in..",
		spinCircleColor: "black",
		spinCircleColor: "#D0D0D0",
		style: { backgroundColor: "#D0D0D0" },
		onFinish: () => handleBigButtonOnFinish(),
	};
	const secondBtn = {
		text: "Press to clock in~",
		// spinCircleColor: "#707070",
		spinCircleColor: "#D0D0D0",
		style: { backgroundColor: "#7CFF81" },
		onFinish: () => handleBigButtonOnFinish(),
	};
	const thirdBtn = {
		text: "Clock out now~!",
		spinCircleColor: "#D0D0D0",
		style: { backgroundColor: "#FF3939", color: "#FFFFFF" },
		onFinish: () => handleBigButtonOnFinish(),
	};
	const bigbtn_1 = <BigButton {...firstBtn} />;
	const bigbtn_2 = <BigButton {...secondBtn} />;
	const bigbtn_3 = <BigButton {...thirdBtn} />;
	const [showBigButton, setShowBigButton] = useState(true);

	const [mainComponent, setMainComponent] = useState(null);
	function handleBigButtonOnFinish() {
		setStateNav(stateNav + 1);
	}

	function handleJobSelection(result) {
		console.log(result);
	}

	const [jobData, setJobData] = useState({});

	const [selectedJob, setSelectedJob] = useState({});
	useEffect(() => {
		if (stateNav === 1) {
			// fetch job data from server
			var jobDataFetch = {};

			get(child(dbRef, `users/${user.uid}/jobs`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						console.log(
							"[" + new Date().toLocaleString() + "] retrieved job data from db"
						);
						jobDataFetch = snapshot.val();
					}
				})
				.catch((error) => {
					props.ShowAlert("Error: could not fetch data from server!");
					console.error(error);
				})
				.finally(() => {
					setJobData(jobDataFetch);

					// selecting job
					setMainComponent(
						<JobSelectionScreen
							jobData={jobDataFetch}
							callback={(e) => {
								setShowBigButton(true);
								console.log("selected:\n", e.result.content, "\n");
								setSelectedJob(e.result.content);
							}}
							{...props}
						/>
					);
					setShowBigButton(false);
				})

		} else if (stateNav === 2) {
			console.log(selectedJob);
			// clocking in
			setMainComponent(
				<View style={{ flex: 1, alignItems: "center" }}> 
				<Text onPress={() => setShowBigButton(true)}>
					Next
				</Text>
				<JobCard style={{marginBottom: 30}} jobObject={selectedJob} removerShown={false} descriptionMultiline={true} />
				</View>
			);
			setShowBigButton(false);
		} else if (stateNav === 3) {
			// clocking out
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
		const [r, err] = await usePromise(
			update(ref(db, "users/" + user.uid), {
				username: user.displayName,
				email: email,
				profile_picture: user.photoURL,
				last_login: new Date().toLocaleString(),
			})
		);
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
					? bigbtn_1
					: stateNav === 1
					? bigbtn_2
					: bigbtn_3
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
