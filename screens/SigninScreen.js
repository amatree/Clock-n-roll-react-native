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

const SigninScreen = ( props ) => {
	const [rememberMe, setRememberMe] = useState(false);
	const [useFaceID, setUseFaceID] = useState(false);
	const [wasSubmitted, setWasSubmitted] = useState(false);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	const zoomScaleX = useSharedValue(1);
	const zoomScaleY = useSharedValue(1);

	const zoomConfig = {
		duration: 1000,
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
		const [user, error] = await usePromise(signInWithEmailAndPassword(auth, username, password))
		if (user) {
			alert("Logged in successfully!");
			props.navigation.dispatch(
				props.navigation.replace("Home", {rememberMe: rememberMe, useFaceID: useFaceID}),
			);
		} else {
			console.log(error)
			alert(error.message);
		}
	}
	
	function handleSignUp() {
		props.navigation.dispatch(
			props.navigation.navigate("Sign Up")
		);
	}

	function handleForgotPassword() {
		alert("currently implementing :3");
	}

	function handleAuthFaceID() {
		alert("FaceIDing...");
	}

	function handleAuthGithub() {
		alert("Github");
	}
	
	function handleAuthGoogle() {
		alert("googleee");
	}

	const signinBtnLayout = ( e ) => {
		if (zoomWidthMin === 0 && zoomHeightMin === 0 ) {
			console.log(e.nativeEvent.layout);
			zoomWidthMin = e.nativeEvent.layout.width;
			zoomHeightMin = e.nativeEvent.layout.height;
			zoomWidth.value = zoomWidthMin;
			zoomHeight.value = zoomHeightMin;
		}
	}

	function testAnimation() {
		setUsername("Test@gmail.com");
		setPassword("12345678");
		zoomScaleX.value = zoomScaleX.value === 1 ? 1.2 : 1;
		zoomScaleY.value = zoomScaleY.value === 1 ? 100 : 1;
	}

	return (
		<View style={styles.container}>
			{/* title here */}
			<View style={styles.titleWrapper}>
				<Text style={styles.title}>Sign In</Text>
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
					<TextInput 	style={styles.input} 
								placeholder='Password' id="password"
								secureTextEntry={true} textContentType='password' autoComplete="password"
								value={password} onChangeText={(value) => setPassword(value)} />
					<Icon style={styles.inputIcon} name="lock-closed-outline" size={24} color="#00000090" />
				</View>
				
				<View style={styles.horizontalDrawer}>
					<CheckBox
					text={"Remember me"}
					value={rememberMe}
					onValueChange={setRememberMe}
					checkedStyle={styles.checkedStyle}
					checkedTextStyle={styles.checkedTextStyle}
					/>
					<CheckBox
					text={"Use FaceID"}
					value={useFaceID}
					onValueChange={setUseFaceID}
					checkedStyle={styles.checkedStyle}
					checkedTextStyle={styles.checkedTextStyle}
					/>
				</View>

				<TouchableOpacity onPress={() => {
					testAnimation();
				}}><Text>test animation</Text></TouchableOpacity>

				<Animated.View style={[zoomStyle, {zIndex: 99}]}>
					<TouchableOpacity style={styles.submitBtn} onPress={() => handleSubmit()}>
						<Text style={[styles.boldText, {color: "white"}]}>Sign in</Text>
					</TouchableOpacity>
				</Animated.View>

				<View style={[styles.horizontalDrawer, {paddingRight: 5, paddingTop: 24}]}>
					<TouchableWithoutFeedback onPress={() => handleForgotPassword()}>
						<Text style={styles.text}>Forgot password?</Text>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback  onPress={() => handleSignUp()}>
						<Text style={[styles.text, {color: "#0D99FF"}]}>Sign up</Text>
					</TouchableWithoutFeedback>
				</View>
			</View>

			{/* authentication here */}
			<View style={styles.auth}>
				<View style={styles.auth_1}>
					<TouchableWithoutFeedback onPress={() => handleAuthFaceID()}>
						<Image source={require("../assets/faceid-icon.png")} 
							style={{width: 48, height: 48}}/>
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.auth_23}>
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
					{/* <TouchableWithoutFeedback onPress={() => handleAuthGithub()}>
						<Image source={require("../assets/github-icon.png")} style={{width: 38, height: 38}}/>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => handleAuthGoogle()}>
						<Image source={require("../assets/google-icon.png")} style={{width: 32, height: 32}}/>
					</TouchableWithoutFeedback> */}

				</View>
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
	},
	title: {
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
		backgroundColor: "#0D99FF",
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
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
		zIndex: -1,
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
	SigninScreen
}
