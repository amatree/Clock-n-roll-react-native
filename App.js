import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreenApp } from "./screens/Home/HomeApp";
import { useEffect } from "react";

import { SigninScreen } from "./screens/SigninScreen";
import { SignupScreen } from "./screens/SignupScreen";

const Stack = createStackNavigator();

var d_width = Dimensions.get('window').width; //full width
var d_height = Dimensions.get('window').height; //full height

function StackNavigation() {
	return (
		<Stack.Navigator initialRouteName="Sign In" screenOptions={{ headerShown: false }}>
			<Stack.Screen 	name="Sign In" 
							component={SigninScreen}
							options={{ 
								cardStyle: [styles.container, {backgroundColor: "#BDE3FF"}],
							}} />
			<Stack.Screen 	name="Sign Up" 
							component={SignupScreen}
							options={{ 
								cardStyle: [styles.container, {backgroundColor: "#FDE3FF"}],
							}} />
			<Stack.Screen 	name="Home" 
							component={HomeScreenApp} 
							options={{ headerShown: false,}} />
		</Stack.Navigator>
	)
}

export default function App() {
	const [fontsLoaded] = useFonts({
		Maitree: require("./assets/fonts/Maitree/Maitree-Regular.ttf"),
		MaitreeSemiBold: require("./assets/fonts/Maitree/Maitree-SemiBold.ttf"),
		MaitreeBold: require("./assets/fonts/Maitree/Maitree-Bold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
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
