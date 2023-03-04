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
import React, {
	Component,
	useEffect,
	useRef,
	useState,
	useCallback,
} from "react";
import { StackActions } from "@react-navigation/routers";
import {
	getAuth,
	updateProfile,
	updateEmail,
	updatePassword,
	updatePhoneNumber,
	verifyBeforeUpdateEmail,
	RecaptchaVerifier,
	PhoneAuthProvider,
} from "firebase/auth";
import { usePromise } from "../../components/PromiseHandle";
import { getDatabase, ref, set, update } from "firebase/database";

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

import BigButton from "../../components/BigButton";
import { JobCard, JobSelectionScreen } from "../../components/JobSelection";
import { getIcon } from "../../utils/Utils";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import { JobCreateForm } from "../../components/JobCreateForm";

const Stack = createStackNavigator();
const JobCreateScreenSteps = [
	"JobMain",
	"AddJobStep1",
	"AddJobStep2",
	"AddJobStep3",
];

function AllJobsScreen(props) {
	// console.log(props);
	function setCurrNavName(name = JobCreateScreenSteps[0]) {
		if (name === JobCreateScreenSteps[0]) {
			resetHeader();
		}
	}

	function resetHeader() {
		props.setOnHeaderBack({
			shown: props.navigation.canGoBack(),
			callback: () => {},
		});
	}

	function beforeLoadingStackScreen(navProps = props) {
		props.setOnHeaderBack({
			shown: navProps.navigation.canGoBack(),
			callback: () => {
				if (navProps.navigation.canGoBack()) {
					navProps.navigation.goBack();
					resetHeader();
				}
			},
		});
	}

	function mainScreen(navProps, props) {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => {
						props.navigation.navigate(JobCreateScreenSteps[1]);
					}}
					style={styles.addJobButton}>
					<>
						{getIcon("plus-box-outline", "M", 24, {
							left: -10,
							top: -1,
							paddingHorizontal: 10,
						})}
						<Text>Add a job</Text>
					</>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						console.log("edit");
					}}
					style={styles.addJobButton}>
					<>
						{getIcon("pencil-outline", "M", 24, {
							left: -10,
							top: -1,
							paddingHorizontal: 10,
						})}
						<Text>Edit a job</Text>
					</>
				</TouchableOpacity>
			</View>
		);
	}

	// Job Create Form
	function addJobStep1(navProps, props) {
		useEffect(() => {
			setCurrNavName(JobCreateScreenSteps[1]);
			beforeLoadingStackScreen(navProps);
		}, []);

		return (
			<>
				<JobCreateForm {...props} />
			</>
		);
	}

	function addJobStep2(navProps, props) {
		useEffect(() => {
			setCurrNavName(JobCreateScreenSteps[2]);
			beforeLoadingStackScreen(navProps);
		}, []);

		return (
			<View>
				<Text>Step 2</Text>
			</View>
		);
	}

	function addJobStep3(navProps, props) {
		useEffect(() => {
			setCurrNavName(JobCreateScreenSteps[3]);
			beforeLoadingStackScreen(navProps);
		}, []);

		return (
			<View>
				<Text>Step 3</Text>
			</View>
		);
	}

	return (
		<Stack.Navigator
			initialRouteName="JobMain"
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="JobMain">
				{(navProps) => mainScreen(navProps, props)}
			</Stack.Screen>
			<Stack.Screen name={JobCreateScreenSteps[1]}>
				{(navProps) => addJobStep1(navProps, props)}
			</Stack.Screen>
			<Stack.Screen name={JobCreateScreenSteps[2]}>
				{(navProps) => addJobStep2(navProps, props)}
			</Stack.Screen>
			<Stack.Screen name={JobCreateScreenSteps[3]}>
				{(navProps) => addJobStep3(navProps, props)}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
		flexDirection: "row",
		marginHorizontal: 10,
	},
	alignRight: {
		flex: 1,
		alignItems: "flex-end",
	},
	alignLeft: {
		flex: 1,
		alignItems: "flex-start",
	},
	addJobButton: {
		alignItems: "center",
		margin: 10,
		padding: 10,
		paddingHorizontal: 30,
		backgroundColor: "white",
		borderRadius: 10,
		flexDirection: "row",
		elevation: 3,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 1,
	},
});

export { AllJobsScreen };
