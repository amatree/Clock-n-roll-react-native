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
import { useEffect, useState, useRef } from "react";

import { SigninScreen } from "./screens/SigninScreen";
import { SignupScreen } from "./screens/SignupScreen";

// APP_TEST HERE
// Import screen/React component as Apptest! i.e.
// import {default as AppTest} from '...';
import { AppTest } from "./test/AppTest";
import { PopupModal } from "./components/PopupModal";
import { TouchableOpacity } from "react-native-gesture-handler";
const APP_TEST = false;

const Stack = createStackNavigator();

var d_width = Dimensions.get("window").width; //full width
var d_height = Dimensions.get("window").height; //full height

function StackNavigation() {
	return (
		<Stack.Navigator
			initialRouteName="Sign In"
			screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="Sign In"
				component={SigninScreen}
				options={{
					cardStyle: [styles.container, { backgroundColor: "#BDE3FF" }],
				}}
			/>
			<Stack.Screen
				name="Sign Up"
				component={SignupScreen}
				options={{
					cardStyle: [styles.container, { backgroundColor: "#FDE3FF" }],
				}}
			/>
			<Stack.Screen
				name="Home"
				component={HomeScreenApp}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	const [fontsLoaded] = useFonts({
		Maitree: require("./assets/fonts/Maitree/Maitree-Regular.ttf"),
		MaitreeSemiBold: require("./assets/fonts/Maitree/Maitree-SemiBold.ttf"),
		MaitreeBold: require("./assets/fonts/Maitree/Maitree-Bold.ttf"),
	});

	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("eee");
	const [modalSettings, setModalSettings] = useState({});

	async function showModal(
		message,
		type = "oc",
		onClose,
		onYes,
		onNo,
		onCancel,
		onOk
	) {
		setModalSettings({
			type,
			onClose,
			onYes,
			onNo,
			onCancel,
			onOk,
		});
		setModalMessage(message);
		setModalVisible(true);
	}

	if (!fontsLoaded) {
		return null;
	}

	if (APP_TEST) {
		return (
			<>
				<PopupModal
					type={"yn"}
					message={modalMessage}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					{...modalSettings}
				/>
				<AppTest popupModal={showModal} />
			</>
		);
	}

	return (
		<NavigationContainer>
			<StackNavigation />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		overflow: "hidden",
		width: d_width,
		margin: 0,
		padding: 0,
	},
});
