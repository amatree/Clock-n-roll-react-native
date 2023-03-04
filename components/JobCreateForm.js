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
	Modal,
} from "react-native";
import { useEffect, useState } from "react";
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
import { ScrollView } from "react-native-gesture-handler";
import { getIcon } from "../utils/Utils";

function JobCreateForm({ onNextStep = () => {}, ...props }) {
	const [jobObject, setJobObject] = useState({
		title: "",
		description: "",
		wage: "",
	});
	const [jobWageTextInput, setJobWageTextInput] = useState(undefined);

	return (
		<View style={[styles.container, { backgroundColor: "" }]}>
			<Text style={[styles.title, {}]}>Create a Job</Text>
			<ScrollView style={{ width: "100%" }}>
				{/* Job title input */}
				<View style={styles.inputContainer}>
					<TextInput
						style={{ ...styles.input }}
						placeholder="Software Engineer"
						onSubmitEditing={(text) =>
							setJobObject({ ...jobObject, title: text })
						}
					/>
					<Text style={[styles.textFont, styles.inputFieldLabel, {}]}>
						Job Title
					</Text>
				</View>

				{/* Wage input */}
				<View style={styles.inputContainer}>
					<TextInput
						style={{ ...styles.input }}
						placeholder="$16/hr"
						maxLength={7}
						keyboardType="numeric"
						inputMode="numeric"
						pattern="[0-9]*"
						defaultValue={jobWageTextInput}
						onBlur={(e) => {
							const text = e.nativeEvent.text;
							if (
								text &&
								!(
									text.includes("$") ||
									text.includes("/") ||
									text.includes("hr")
								)
							) {
								setJobWageTextInput("$" + text + "/hr");
							}
						}}
						onFocus={(e) => {
							const text = e.nativeEvent.text;
							setJobWageTextInput(undefined);
							if (
								text &&
								(text.includes("$") ||
									text.includes("/") ||
									text.includes("hr"))
							) {
								setJobWageTextInput(text.toString().replace(/[$/hr]|/g, ""));
							}
						}}
						onSubmitEditing={(text) => {
							const wph = text.toString().replace(/[$/hr]|/g, "");
							setJobObject({ ...jobObject, wage: wph });
						}}
					/>
					<Text style={[styles.textFont, styles.inputFieldLabel, {}]}>
						Wage per Hour
					</Text>
				</View>

				{/* Job description input */}
				<View style={[styles.inputContainer, {}]}>
					<TextInput
						style={[
							styles.input,
							{
								textAlign: "left",
								paddingLeft: 30,
								paddingTop: 55,
								paddingBottom: 20,
								minHeight: 150,
							},
						]}
						placeholder="Develop systems and software that allow users to perform specific tasks on computers or other devices."
						multiline={true}
						autoComplete={false}
						onSubmitEditing={(text) =>
							setJobObject({ ...jobObject, description: text })
						}
					/>
					<Text style={[styles.textFont, styles.inputFieldLabel, { top: 25 }]}>
						Job Description (Optional)
					</Text>
				</View>
			</ScrollView>

			{/* Controls */}
			<TouchableOpacity
				style={{
					position: "absolute",
					bottom: 50,
          right: 30,
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 30,
          shadowOpacity: 0.5,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 2,
				}}
				onPress={() => {
					onNextStep();
				}}>
				<Text
					style={[
						styles.textFont,
						{ fontSize: 20, fontFamily: "MaitreeSemiBold" },
					]}>
					Next {">>"}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	title: {
		margin: 30,
		fontSize: 24,
		fontFamily: "MaitreeSemiBold",
		letterSpacing: 3,
	},
	inputContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 10,
		padding: 15,
		paddingLeft: 100,
		paddingRight: 30,
		borderRadius: 30,
		backgroundColor: "#FFFFFF",
		fontFamily: "Maitree",
		overflow: "scroll",
		textAlign: "right",
		fontSize: 16,
	},
	textFont: {
		fontFamily: "Maitree",
	},
	inputFieldLabel: {
		position: "absolute",
		marginLeft: 50,
		left: 0,
		color: "#123272",
		textDecorationLine: "underline",
		fontSize: 16,
	},
});

export { JobCreateForm };
