import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CheckBox } from '../components/CheckBox';

import { onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { usePromise } from '../components/PromiseHandle';
import { StackActions } from '@react-navigation/routers';

import Icon from 'react-native-vector-icons/Ionicons';
import {default as MCIcon} from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	withRepeat,
	withSpring,
} from 'react-native-reanimated';

var d_width = Dimensions.get('window').width; //full width
var d_height = Dimensions.get('window').height; //full height

const SignupScreen = ( props ) => {
	const [rememberMe, setRememberMe] = useState(false);
	const [useFaceID, setUseFaceID] = useState(false);
	const [wasSubmitted, setWasSubmitted] = useState(false);

	const [username, setUsername] = useState("");
	const [emailCode, setEmailCode] = useState("")
	const [password, setPassword] = useState("");
	
	const zoomScaleX = useSharedValue(1);
	const zoomScaleY = useSharedValue(1);

	const zoomConfig = {
		duration: 400,
	};
	const zoomStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{scaleX: withTiming(zoomScaleX.value, zoomConfig)},
				{scaleY: withTiming(zoomScaleY.value, zoomConfig)},
			]
		}
	});
	

	async function handleSubmit() {
		const [user, error] = await usePromise(createUserWithEmailAndPassword(auth, username, password))
		if (user) {
			alert("Account created successfully!");
			props.navigation.dispatch(
				props.navigation.replace("Sign In")
			);
		} else {
			console.log(error)
			alert(error.message);
		}
	}

	function handleGotoSignin() {
		props.navigation.goBack();
	}

	function handleAuthGithub() {
		alert("Github");
	}
	
	function handleAuthGoogle() {
		alert("googleee");
	}

	function handleGetEmailCode() {
		alert("Getting da code (wip)")
	}

	function testAnimation() {
		setUsername("Test@gmail.com");
		setPassword("12345678");
		zoomScaleX.value = zoomScaleX.value === 1 ? 2 : 1;
		zoomScaleY.value = zoomScaleY.value === 1 ? 100 : 1;
		console.log(zoomScaleX.value);
		console.log(zoomScaleY.value);
	}

	return (
		<View style={styles.container}>
			{/* title here */}
			<View style={styles.titleWrapper}>
				<Text style={styles.title}>Create an Account</Text>
				<Text style={[styles.infoText, {paddingVertical: 18}]}>Log in to save your data and share plans with friends~!</Text>
			</View>

			{/* login form here */}
			<View style={styles.loginForm}>
				<View style={styles.iconTextInput}>
					<TextInput 	style={styles.input} 
								placeholder='Username/Email' id="email" 
								keyboardType="email-address" textContentType='username'
								autoCapitalize='none' autoCorrect={false} autoFocus={true} autoComplete="username"
								value={username} onChangeText={(value) => setUsername(value)}></TextInput>
					<Icon style={styles.inputIcon} name="person-outline" size={24} color="#00000090" />
				</View>
				<View style={styles.iconTextInput}>
					<TextInput 	style={[styles.input, {width: "55%"}]} 
								placeholder="Enter Code" id="oneTimeCode"
								secureTextEntry={true} textContentType="oneTimeCode" autoComplete="sms-otp"
								value={emailCode} onChangeText={(value) => setEmailCode(value)} />
					<MCIcon style={styles.inputIcon} name="numeric-1-box-multiple-outline" size={24} color="#00000090" />
					<TouchableOpacity style={styles.getCodeBtn} onPress={() => handleGetEmailCode()}>
						<Text style={[styles.boldText, {color: "white"}]}>Get Code</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.iconTextInput}>
					<TextInput 	style={styles.input} 
								placeholder='Password' id="password"
								secureTextEntry={true} textContentType='password' autoComplete="password"
								value={password} onChangeText={(value) => setPassword(value)} />
					<Icon style={styles.inputIcon} name="lock-closed-outline" size={24} color="#00000090" />
				</View>

				<TouchableOpacity onPress={() => {
					testAnimation();
				}}><Text>test animation</Text></TouchableOpacity>

				<Animated.View style={zoomStyle}>
					<TouchableOpacity style={styles.submitBtn} onPress={() => handleSubmit()}>
						<Text style={[styles.boldText, {color: "white"}]}>Sign up</Text>
					</TouchableOpacity>
				</Animated.View>

				<TouchableWithoutFeedback onPress={() => handleAuthGithub()}>
					<View style={styles.authBtn}>
						<Text style={[styles.boldText, {color: "black"}]}>Sign in with GitHub</Text>
						<Image source={require("../assets/github-icon.png")} style={[styles.authImg, {width: 38, height: 38}]}/>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => handleAuthGoogle()}>
					<View style={styles.authBtn}>
						<Text style={[styles.boldText, {color: "black"}]}>Sign in with Google</Text>
						<Image source={require("../assets/google-icon.png")} style={[styles.authImg, {width: 32, height: 32}]}/>
					</View>
				</TouchableWithoutFeedback>
				<TouchableOpacity style={styles.backBtn} onPress={() => handleGotoSignin()}>
					<View style={{justifyContent: "center"}}>
						<Text style={[styles.boldText, {color: "black"}]}>Back to Sign In</Text>
						<Icon style={{alignSelf: "flex-start", position: "absolute", left: -36}} name="arrow-back" size={32} color="#00000090" />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 0,
		padding: 0,
	},
	titleWrapper: {
		width: 200,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		width: 300,
		textAlign: "center",
		fontFamily: "MaitreeBold",
		fontSize: "32",
	},
	infoText: {
		textAlign: "center",
		fontFamily: "Maitree",
		fontSize: "15",
		color: "#757575",
		opacity: 0.5,
	},
	loginForm: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 30,
		alignSelf: "flex-start",
		width: "100%",
	},
	text: {
		fontFamily: "Maitree",
		fontSize: "18",
	},
	boldText: {
		fontFamily: "MaitreeBold",
		fontSize: "18",
	},
	iconTextInput: {

	},
	input: {
		paddingLeft: 64,
		marginBottom: 20,
		width: "100%",
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderRadius: "24",
		borderColor: "#00000030",
		backgroundColor: "white",
		fontFamily: "Maitree",
		fontSize: "14",
	},
	getCodeBtn: {
		width: "40%",
		paddingVertical: 10,
		marginHorizontal: 16,
		backgroundColor: "#422AD6",
		borderRadius: 6,
		alignItems: "center",
		alignSelf: "flex-end",
		justifyContent: "center",
		position: "absolute",
	},
	inputIcon: {
		position: "absolute",
		left: "6.5%",
		top: "16%",
	},
	horizontalDrawer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	checkedStyle: {
		backgroundColor: "green",
	},
	checkedTextStyle: {
		fontFamily: "MaitreeBold",
	},
	submitBtn: {
		marginTop: 20,
		paddingVertical: 10,
		backgroundColor: "#C92AD6",
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
	},
	backBtn: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		marginTop: 20,
		paddingVertical: 10,
		borderRadius: 6,
	},
	submitBtnZoom: {
		position: "absolute",
		left: "50%",
		top: "50%",
		margin: 0,
		padding: 0,
		backgroundColor: "#0D99FF",
		color: "#0D99FF",
		zIndex: 99,
	},
	auth: {
		paddingTop: 16,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	auth_1: {
		paddingTop: 32,
	},
	auth_23: {
		alignSelf: "flex-start",
		justifyContent: "center",
		width: "100%",
		paddingLeft: 20,
		paddingRight: 20,
	},
	authBtn: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		marginTop: 20,
		paddingVertical: 10,
		borderRadius: 6,
	},
	authImg: {
		position: "absolute",
		right: 36,
	},
});


export {
	SignupScreen
}
