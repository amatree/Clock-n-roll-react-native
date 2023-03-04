import {
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

function Header({
	text = "Clock'n'roll",
	style = {},
	backButtonShown = false,
	...props
}) {
	const styles = StyleSheet.create({
		header: {
			zIndex: 0,
			backgroundColor: "white",
			height: 128,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			paddingTop: 55,
			shadowOpacity: 0.5,
			shadowOffset: {
				width: 1,
				height: 2,
			},
			elevation: 5,
		},
		text: {
			fontFamily: "MaitreeSemiBold",
			fontSize: 29,
			letterSpacing: 1,
		},
		backButton: {
			position: "absolute",
			flex: 1,
			width: "100%",
			height: 128,
			alignItems: "flex-start",
			justifyContent: "flex-end",
			paddingLeft: 20,
			paddingBottom: 15,
		},
		backText: {
			fontFamily: "MaitreeSemiBold",
			fontSize: 20,
			letterSpacing: 0.5,
			color: "#123272",
		},
	});

	const headerTranslateY = useSharedValue(0);
	const headerTranslateYStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: withSpring(headerTranslateY.value, { duration: 100 })}
			]
		}
	});

	useEffect(() => {
		ToggleHeader(props._showHeader);
	}, [props._showHeader])

	function ToggleHeader(shown = true) {
		if (shown) {
			headerTranslateY.value = 0;
		} else {
			headerTranslateY.value = -130;
		}
	}

	return (
		<Animated.View style={[styles.header, headerTranslateYStyle, style]}>
			<Text style={styles.text}>{text}</Text>
			{backButtonShown && (
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => {
						props.onHeaderBack.callback();
					}}>
					<Text style={styles.backText}>{"<"} Back</Text>
				</TouchableOpacity>
			)}
		</Animated.View>
	);
}

export { Header };
