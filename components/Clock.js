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
import Stopwatch from "./Stopwatch";
import { ToCurrency, TrimForNumber } from "../utils";

export default function Clock({ child, childProps, ...props }) {
	const [clockedAt, _] = useState(new Date());
	const stopWatch = Stopwatch();
	useEffect(() => {
		stopWatch.startTimer();
	}, []);

	function TimeBox({ size = 20, ...props }) {
		return (
			<View style={[styles.box, { padding: size }]}>
				<Text style={[styles.text, { color: "" }]}>
					{stopWatch.formatElapsedTime()}
				</Text>
			</View>
		);
	}

	function EarningBox() {
		return (
			<View style={[styles.box, { paddingBottom: 24 }]}>
				<Text style={[styles.text, { color: "#85bb65" }]}>
					{ToCurrency(stopWatch.formatAs("h") * props.job.wage)}
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={[styles.infoText, { color: "" }]}>
				{"Clocked in since\n" + clockedAt.toTimeString()}
			</Text>
			<TimeBox />
			<EarningBox />
			{child({
				...childProps,
				onFinish: () => {
					stopWatch.stopTimer();
					childProps.onFinish({
						timeElapsed: stopWatch.formatAsTimeObject(),
						startTime: clockedAt,
						endTime: new Date(),
            earning: TrimForNumber(ToCurrency(stopWatch.formatAs("h") * props.job.wage)),
					});
				},
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minWidth: "100%",
		paddingHorizontal: 12,
		alignItems: "center",
		justifyContent: "flex-start",
		textAlign: "center",
	},
	box: {},
	text: {
		fontFamily: "MaitreeMedium",
		fontSize: 48,
		letterSpacing: 2,
		textAlign: "center",
	},
	infoText: {
		textAlign: "center",
		fontSize: 16,
	},
});
