import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";

const Stack = createStackNavigator();

var d_width = Dimensions.get('window').width; //full width
var d_height = Dimensions.get('window').height; //full height

function StackNavigation() {
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<Stack.Screen 	name="Login" 
							component={LoginScreen}
							options={{ 
								cardStyle: styles.container,
							}}/>
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true,}} />
		</Stack.Navigator>
	)
}

export default function App() {
	const [fontsLoaded] = useFonts({
		Maitree: require("./assets/fonts/Maitree/Maitree-Regular.ttf"),
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
		backgroundColor: "#BDE3FF",
		height: "100%",
		overflow: "hidden",
		width: d_width,
		flex: 1,
	},
});
