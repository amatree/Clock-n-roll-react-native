import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LoginScreen } from "./screens/LoginScreen";
import { useFonts } from "expo-font";

var d_width = Dimensions.get('window').width; //full width
var d_height = Dimensions.get('window').height; //full height

export default function App() {
	const [fontsLoaded] = useFonts({
		Maitree: require("./assets/fonts/Maitree/Maitree-Regular.ttf"),
		MaitreeBold: require("./assets/fonts/Maitree/Maitree-Bold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={styles.container}>
			<LoginScreen />
		</View>
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
