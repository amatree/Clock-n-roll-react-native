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

function JobSelectionScreen( {callback = () => {}, ...props} ) {

	return (
		<View style={styles.container}>
			<Text onPress={() => {callback();}}>HASD</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",

	}
});

export {
  JobSelectionScreen,
}