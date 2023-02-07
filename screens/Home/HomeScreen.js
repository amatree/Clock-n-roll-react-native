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
import { usePromise } from '../../components/PromiseHandle';
import { getDatabase, ref, set } from "firebase/database";


function HomeScreen ( props ) {
	const auth = getAuth();
	const user = auth.currentUser;
	const db = getDatabase();

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

	async function handleWriteData() {
		const [r, err] = await usePromise(set(ref(db, 'users/' + user.uid), {
		  username: user.displayName,
		  email: email,
		  profile_picture : user.photoURL,
		  last_login: new Date().toLocaleString(),
		}));

		if (err)
		{
			alert(err.message);
		} else {
			alert("success!")
		}
	}

	return (
		<>
			<View style={{flex: 1, alignItems: "center"}}>
				<Text>Hi {user.displayName}, I am homescreen</Text>
				<Button onPress={() => handleWriteData()} title="Write data"></Button>
				<Button onPress={() => returnToLogin()} title="Log out"></Button>
			</View>
			{/* <BottomTabs /> */}
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
		borderRadius: 24,
		borderColor: "#00000030",
		backgroundColor: "white",
		fontFamily: "Maitree",
		fontSize: 12,
	},
});

export {
	HomeScreen,
}