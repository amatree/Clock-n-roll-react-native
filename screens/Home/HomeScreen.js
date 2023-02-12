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
import { usePromise } from "../../components/PromiseHandle";
import { getDatabase, ref, set, update } from "firebase/database";

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	withRepeat,
	withSpring,
} from "react-native-reanimated";

var d_width = Dimensions.get("window").width; //full width
var d_height = Dimensions.get("window").height; //full height

function BigButton({ text = "click me", ...props }) {
	function handleOnPress() {
		props.onPress && props.onPress();
		console.log("on press")
	}

	function handlePressIn() {
		props.onPressIn && props.onPressIn();
		console.log("press in");
	}

	const styles = StyleSheet.create({
		bigbtn: {
			justifyContent: "center",
			alignItems: "center",
			width: 0.8 * d_width,
			height: 0.8 * d_width,
			backgroundColor: "#D0D0D0",
			borderRadius: 0.8 * d_width,
			shadowOpacity: 0.5,
			shadowOffset: {
				width: 5,
				height: 10,
			},
		},
		text: {
			fontFamily: "MaitreeBold",
			fontSize: 24,
			textAlign: "center",
			paddingHorizontal: 12,
		},
	});

	return (
		<Animated.View>
			<TouchableWithoutFeedback
				{...props}
				onPressIn={() => {
					handlePressIn();
				}}
				onPress={() => {
					handleOnPress();
				}}>
				<View style={[styles.bigbtn, props.style]}>
					<Text style={styles.text}>{text}</Text>
				</View>
			</TouchableWithoutFeedback>
		</Animated.View>
	);
}

function HomeScreen({ states, setStates, ...props }) {
	const auth = getAuth();
	const user = auth.currentUser;
	const db = getDatabase();

	if (!user) {
		console.error("no access to home page");
		signOutAndReturnToLogin();
		return;
	}

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

	async function handleWriteData() {
		const [r, err] = await usePromise(
			update(ref(db, "users/" + user.uid), {
				username: user.displayName,
				email: email,
				profile_picture: user.photoURL,
				last_login: new Date().toLocaleString(),
			})
		);

		if (err) {
			alert(err.message);
		} else {
			alert("success!");
		}
	}

	function handleBigButton() {
		console.log("clicked the big button");
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
			<BigButton
				text={"Select a job to clock in.."}
				style={{backgroundColor: "#D0D0D0"}}
				onPress={() => handleBigButton()}
			/>
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
