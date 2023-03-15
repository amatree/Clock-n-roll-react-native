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
import React, { useEffect, useRef, useState, lazy, Suspense } from "react";

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
	runOnJS,
} from "react-native-reanimated";

var d_width = Dimensions.get("window").width; //full width
var d_height = Dimensions.get("window").height; //full height

export default function BigButton({
	text = "click me",
	title = "",
	spinCircleColor = "black",
	onFinish = () => {},
	...props
}) {
	const [isPressingIn, setIsPressingIn] = useState(false);

	const btnCircleRun = useSharedValue(0);
	const btnSpinStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					// interpolate(btnCircleRun.value, [0, 270], [0, 270]) + "deg"
					rotate: btnCircleRun.value + "deg",
				},
			],
		};
	});
	const btnPressValue = useSharedValue(0);
	const btnPressStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: btnPressValue.value }],
		};
	});

	useEffect(() => {
		btnPressValue.value = withSpring(1, { duration: 500 });
		// btnCircleRun.value = withRepeat(
		// 	withTiming(480, { duration: 10000 }),
		// 	-1,
		// 	false
		// );
	}, []);

	useEffect(() => {
		if (isPressingIn) {
			// TODO: await for response then activate animation
			setIsPressingIn(false);
			btnPressValue.value = withTiming(0, { duration: 400 }, () => {
				runOnJS(onFinish)();
			});
		}
	}, [isPressingIn]);

	async function handleOnPress() {
		// btnCircleRun.value = withSpring(-360, {duration: 600});
		// props.onPress && props.onPress();
		// btnPressValue.value = withSpring(0, {duration: 1000});
		setIsPressingIn(true);
		setTimeout(() => {
			// onFinish();
		}, 500);
	}

	async function handlePressIn() {
		btnCircleRun.value = withRepeat(
			withTiming(7200, { duration: 10000 }),
			-1,
			false
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
			elevation: 5,
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
			elevation: 5,
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
			color: props.style.color || "#000000",
		},
		titleText: {
			position: "absolute",
			fontFamily: "MaitreeBold",
			fontSize: 24,
			textAlign: "center",
			paddingHorizontal: 12,
			color: props.style.color || "#000000",
			maxWidth: "90%",
			zIndex: 1,
			top: -0.157 * d_height,
			textDecorationLine: "underline",
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
			<View style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
				{title != "" && <Text style={[styles.titleText,]}>{title}</Text>}
				<Animated.View style={btnPressStyle}>
					<View style={styles.bigbtnShadow}>
						<Animated.View style={btnSpinStyle}>
							<View style={[styles.bigbtn, props.style]} />
						</Animated.View>
						<Text style={[styles.text]}>{text}</Text>
					</View>
				</Animated.View>
			</View>
		</TouchableWithoutFeedback>
	);
}
