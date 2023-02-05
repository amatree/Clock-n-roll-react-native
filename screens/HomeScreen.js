import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, TouchableWithoutFeedback, Button } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StackActions } from '@react-navigation/routers';
import { getAuth, 
	updateProfile,
	updateEmail,
	updatePassword,
	updatePhoneNumber,
	verifyBeforeUpdateEmail,
	RecaptchaVerifier,
	PhoneAuthProvider, } from 'firebase/auth';
import { usePromise } from '../components/PromiseHandle';


function HomeScreen ( props ) {
	const auth = getAuth();
	const user = auth.currentUser;
	if ( !user ) {
		alert( "no access! ")
		returnToLogin();
		return;
	}

	const [displayName, setDisplayName] = useState(user.displayName);
	const [email, setEmail] = useState(user.email);
	const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
	const [photoURL, setPhotoURL] = useState(user.photoURL);
	
	function returnToLogin() {
		props.navigation.replace("Sign In");
	}

	return (
		<>
			<View style={{flex: 1, alignItems: "center"}}>
				<Text>Hi {user.displayName}, I am homescreen</Text>
				<Button onPress={() => returnToLogin()} title="Log out"></Button>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
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
});

export {
	HomeScreen,
}