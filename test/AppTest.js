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

var d_width = Dimensions.get("window").width; //full width
var d_height = Dimensions.get("window").height; //full height

function BigButton({ text = "click me", spinCircleColor = "black", ...props }) {
	const [isPressingIn, setIsPressingIn] = useState(false);

	const btnCircleRun = useSharedValue(0);
	const btnSpinStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: interpolate(btnCircleRun.value, [0, 360], [0, 360]) + "deg" }],
		};
	});
	const btnPressValue = useSharedValue(0);
	const btnPressStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: btnPressValue.value }],
		};
	});

	useEffect(() => {
		btnPressValue.value = withSpring(1, {duration: 500});
		btnCircleRun.value = withRepeat(
			withTiming(560, {duration: 10000}), -1, false
		);
	}, []);

	useEffect(() => {
		if (isPressingIn) {
			// TODO: await for response then activate animation
			btnPressValue.value = withTiming(0, {duration: 400});
			setIsPressingIn(false);
		}
	}, [isPressingIn])

	function handleOnPress() {
		// btnCircleRun.value = withSpring(-360, {duration: 600});
		// props.onPress && props.onPress();
		// btnPressValue.value = withSpring(0, {duration: 1000});
		setIsPressingIn(true);
	}
	
	async function handlePressIn() {
		btnCircleRun.value = withRepeat(
			withTiming(7200, {duration: 10000}), -1, false
		);
		props.onPressIn && props.onPressIn();
	}

	const styles = StyleSheet.create({
		bigbtn: {
			justifyContent: "center",
			alignItems: "center",
			width: 0.8 * d_width,
			height: 0.8 * d_width,
			backgroundColor: spinCircleColor,
			borderRadius: 0.8 * d_width,
			borderColor: spinCircleColor,
			borderTopWidth: 3,
			borderRightWidth: 1.5,
			borderBottomWidth: 0.75,
			borderLeftWidth: 0.75 / 2,
		},
		bigbtnShadow: {
			width: 0.8 * d_width,
			height: 0.8 * d_width,
			borderRadius: 0.8 * d_width,
			shadowOpacity: 0.5,
			shadowOffset: {
				width: 5,
				height: 10,
			},
			borderColor: "#E0E0E0",
			borderLeftWidth: 3,
		},
		text: {
			position: "relative",
			top: -0.445 * d_width,
			fontFamily: "MaitreeBold",
			fontSize: 24,
			textAlign: "center",
			paddingHorizontal: 12,
		},
	});

	return (
		<TouchableWithoutFeedback
			{...props}
			onPressIn={() => {
				handlePressIn();
			}}
			onPress={() => {
				handleOnPress();
			}}>
			<Animated.View style={btnPressStyle}>
				<View style={styles.bigbtnShadow}>
					<Animated.View style={btnSpinStyle}>
						<View style={[styles.bigbtn, props.style]} />
					</Animated.View>
					<Text style={[styles.text]}>{text}</Text>
				</View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

function AppTest({ states, setStates, ...props }) {
	const [stateNav, setStateNav] = useState(0);
	const [currState, setCurrState] = useState(null);

	async function handleBigButton() {
		props.popupModal("ihii");
		if (stateNav > 2) {
			setStateNav(0)
		} else {
			setStateNav(stateNav + 1)
		}
	}
	
	useEffect(() => {
		setCurrState(stateNav === 0 ?
		<BigButton start
		text={"Select a job to clock in.."}
		spinCircleColor="black"
		style={{ backgroundColor: "#D0D0D0" }}
		onFinish={() => handleBigButton()}
		/> :
		stateNav === 1 ?
		<BigButton start
		text={"Press to clock in~"}
		spinCircleColor="#707070"
		style={{ backgroundColor: "#7CFF81" }}
		onFinish={() => handleBigButton()}
		/> :
		<BigButton start
		text={"Clock out now~!"}
		spinCircleColor="#D0D0D0"
		style={{ backgroundColor: "#FF3939" }}
		onFinish={() => handleBigButton()}
		/>
		);
	}, [stateNav])
	
	return (
		<View
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				paddingBottom: 24,
				height: "100%",
			}}>
			{ currState }
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

export { AppTest };
