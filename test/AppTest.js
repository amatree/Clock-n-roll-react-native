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
import { usePromise } from "../components/PromiseHandle";
import { getDatabase, ref, set, update } from "firebase/database";

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

import * as LocalAuthentication from "expo-local-authentication";

var d_width = Dimensions.get("window").width; //full width
var d_height = Dimensions.get("window").height; //full height

function AppTest({ states, setStates, ...props }) {
	const [isBiometricSupported, setIsBiometricSupported] = useState(false);
	const [result, setResult] = useState("")

	useEffect(() => {
		checkBiometrics();

		if (isBiometricSupported) {
			handleBiometricAuth();
		}
	}, [isBiometricSupported]);

	const handleBiometricAuth = async () => {
		const biometricAuth = await LocalAuthentication.authenticateAsync({
			promptMessage: "Login with Biometrics",
			disableDeviceFallback: true,
		});

		setResult(biometricAuth.warning);
	};

	async function checkBiometrics() {
		setIsBiometricSupported(await LocalAuthentication.hasHardwareAsync());
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
			<Text style={styles.blue}>this is text</Text>
			<Text>{result}</Text>
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
	blue: {
		color: "blue",
	},
});

export { AppTest };
