import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CheckBox } from '../components/CheckBox';

import { onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { usePromise } from '../components/PromiseHandle';
import { StackActions } from '@react-navigation/routers';


const LoginScreen = ( props ) => {
	const [rememberMe, setRememberMe] = useState(false);
	const [useFaceID, setUseFaceID] = useState(false);
	const [wasSubmitted, setWasSubmitted] = useState(false);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	

	async function handleSubmit() {
		const [user, error] = await usePromise(signInWithEmailAndPassword(auth, username, password))
		if (user) {
			alert("Logged in successfully!");
			props.navigation.dispatch(
				StackActions.replace("Home", "Login")
			);
		} else {
			console.log(error)
			alert(error.message);
		}
	}
	
	async function handleSignUp() {
		const [user, error] = await usePromise(createUserWithEmailAndPassword(auth, username, password))
		if (user) {
			alert("Signed up successfully!");
		} else {
			console.log(error)
			alert(error.message);
		}
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

	return (
		<View style={styles.container}>
			{/* title here */}
			<View style={styles.titleWrapper}>
				<Text style={styles.title}>Sign In</Text>
				<Text style={[styles.infoText, {paddingVertical: 18}]}>Log in to save your data and share plans with friends~!</Text>
			</View>

			{/* login form here */}
			<View style={styles.loginForm}>
				<Text style={styles.text}>Username/Email:</Text>
				<TextInput 	style={styles.input} 
							placeholder='Username/Email' id="email" 
							keyboardType="email-address" textContentType='username'
							autoCapitalize='none' autoCorrect={false} autoFocus={true} autoComplete="username"
							value={username} onChangeText={(value) => setUsername(value)} />
				<Text style={styles.text}>Password:</Text>
				<TextInput 	style={styles.input} 
							placeholder='Password' id="password"
							secureTextEntry={true} textContentType='password' autoComplete="password"
							value={password} onChangeText={(value) => setPassword(value)} />
				
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

				<TouchableOpacity style={styles.submitBtn} onPress={() => handleSubmit()}>
					<Text style={[styles.text, {color: "white"}]}>Sign in</Text>
				</TouchableOpacity>

				<View style={[styles.horizontalDrawer, {paddingRight: 5, paddingTop: 12}]}>
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
				<Text style={[styles.infoText, {fontSize: 12, paddingVertical: 3}]}>Or authenticate with the following:</Text>
				<View style={styles.auth_23}>
					<TouchableWithoutFeedback onPress={() => handleAuthGithub()}>
						<Image source={require("../assets/github-icon.png")} style={{width: 38, height: 38}}/>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => handleAuthGoogle()}>
						<Image source={require("../assets/google-icon.png")} style={{width: 32, height: 32}}/>
					</TouchableWithoutFeedback>

				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		top: 120,
		justifyContent: "center",
		alignItems: "center",
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
		fontSize: "17",
		marginBottom: 5,
	},
	input: {
		marginBottom: 20,
		width: "100%",
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderRadius: "24",
		borderColor: "#00000030",
		backgroundColor: "white",
		fontFamily: "Maitree",
		fontSize: "12",
	},
	horizontalDrawer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingRight: 100,
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
	auth: {
		paddingTop: 32,
	},
	auth_1: {
		alignItems: "center",
		justifyContent: "center",
	},
	auth_23: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 58,
	},
});


export {
	LoginScreen
}
