import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Button,
	Pressable,
} from "react-native";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreenApp } from "./screens/Home/HomeApp";
import { useEffect, useState, useRef, lazy, Suspense } from "react";

import { SigninScreen } from "./screens/SigninScreen";
import { SignupScreen } from "./screens/SignupScreen";

// APP_TEST HERE
// Import screen/React component as Apptest! i.e.
// import {default as AppTest} from '...';
import { AppTest } from "./test/AppTest";
import { PopupModal } from "./components/PopupModal";
import LoadingScreen from "./components/LoadingScreen";

const APP_TEST = false;

const Stack = createStackNavigator();

export const DEVICE_WIDTH = Dimensions.get("window").width; //full width
export const DEVICE_HEIGHT = Dimensions.get("window").height; //full height

export default function App() {
	const [fontsLoaded] = useFonts({
		Maitree: require("./assets/fonts/Maitree/Maitree-Regular.ttf"),
		MaitreeMedium: require("./assets/fonts/Maitree/Maitree-Medium.ttf"),
		MaitreeSemiBold: require("./assets/fonts/Maitree/Maitree-SemiBold.ttf"),
		MaitreeBold: require("./assets/fonts/Maitree/Maitree-Bold.ttf"),
	});

	const childProps = {
	};

	function StackNavigation() {
		return (
			<Stack.Navigator
				initialRouteName="Sign In"
				screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="Sign In"
					options={{
						cardStyle: [styles.container, { backgroundColor: "#BDE3FF" }],
					}}>
					{(props) => <SigninScreen {...props} {...childProps} />}
				</Stack.Screen>
				<Stack.Screen
					name="Sign Up"
					options={{
						cardStyle: [styles.container, { backgroundColor: "#FDE3FF" }],
					}}>
					{(props) => <SignupScreen {...props} {...childProps} />}
				</Stack.Screen>
				<Stack.Screen name="HomeApp" options={{ headerShown: false }}>
					{(props) => <HomeScreenApp {...props} {...childProps} />}
				</Stack.Screen>
			</Stack.Navigator>
		);
	}

	if (!fontsLoaded) {
		return <LoadingScreen text="Loading resources..." />;
	}

	if (APP_TEST) {
		return (
			<>
				<AppTest />
			</>
		);
	}

	return (
		<>
			<NavigationContainer>
				<StackNavigation />
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		overflow: "hidden",
		width: DEVICE_WIDTH,
		DEVICE_HEIGHT: 0,
		padding: 0,
	},
});
