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


function ChangeProfileScreen ( props ) {
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

	const [i_displayName, seti_DisplayName] = useState("");
	const [i_email, seti_Email] = useState("");
	const [i_phoneNumber, seti_PhoneNumber] = useState("");
	const [i_photoURL, seti_PhotoURL] = useState("");

	const [refreshPage, setRefreshPage] = useState(false);

	const captchaRef = useRef(null);

	useEffect( () => {
		if (refreshPage)
		{
			console.log("content refreshed!");
			setRefreshPage(false);
		}
	}, [refreshPage])
	
	function returnToLogin() {
		props.navigation.replace("Login");
	}

	function getInfo() {
		console.log(user)
	}

	async function updateUser( object ) {
		if ( object.displayName && object.photoURL) {
			const [respond, error] = await usePromise(updateProfile(auth.currentUser, {
				displayName: object.displayName,
				photoURL: object.photoURL,
			}));

			if ( error ) {
				console.log(error.message);
				alert(error.message);
			} else {
				alert("Successfully updated name and photo url!");
				seti_DisplayName("");
				seti_PhotoURL("");
			}
		} else if ( object.displayName ) {
			const [respond, error] = await usePromise(updateProfile(auth.currentUser, {displayName: object.displayName}));
			
			if ( error ) {
				console.log(error.message);
				alert(error.message);
			} else {
				alert("Successfully updated name!");
				seti_DisplayName("");
			}
		} else if ( object.photoURL) {
			const [respond, error] = await usePromise(updateProfile(auth.currentUser, {photoURL: object.photoURL}));
			
			if ( error ) {
				console.log(error.message);
				alert(error.message);
			} else {
				alert("Successfully updated photo url!");
				seti_PhotoURL("");
			}
		} 
		
		if ( object.email) {
			const [respond, error] = await usePromise(updateEmail(auth.currentUser, object.email.trim()));

			if ( error ) {
				console.log(error.message);
				alert(error.message);
			} else {
				alert("Successfully updated email!");
				seti_Email("");
			}
		} 
		if ( object.phoneNumber) {
			// // 'recaptcha-container' is the ID of an element in the DOM.
			// const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
			// const provider = new PhoneAuthProvider(auth);
			// const verificationId = await provider.verifyPhoneNumber(object.phoneNumber, recaptchaVerifier);
			// // Obtain the verificationCode from the user.
			// const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);

			// const [respond, error] = await usePromise(updatePhoneNumber(auth.currentUser, phoneCredential));

			// if ( error ) {
			// 	console.log(error.message);
			// 	alert(error.message);
			// } else {
			// 	alert("Successfully updated phone number!");
			// seti_PhoneNumber("");
			// }

			alert("Currently not supported for changing phone number!");
		} 
		if ( object.password) {
			const [respond, error] = await usePromise(updatePassword(auth.currentUser, object.password));

			if ( error ) {
				console.log(error.message);
				alert(error.message);
			} else {
				alert("Successfully updated password!");
			}
		}
		
		setRefreshPage(true);
		return;
	}
	
	async function toUpdateUser() {
		let upd_action = {};
		if (i_displayName != displayName)
			upd_action.displayName = i_displayName;
		if (i_email != email)
			upd_action.email = i_email;
		if (i_phoneNumber != phoneNumber)
			upd_action.phoneNumber = i_phoneNumber;
		if (i_photoURL != photoURL)
			upd_action.photoURL = i_photoURL;

		console.log(upd_action);
		updateUser(upd_action);
	}

	return (
		<>
			<View style={{flex: 1, alignItems: "center"}}>
			<Text>Hi {user.displayName}, I am homescreen</Text>			
			<Text>Your email: {user.email}</Text>			
			<Text>Your phone number: {user.phoneNumber}</Text>			
			<Text>Your photo URL: {user.photoURL}</Text>

			<TextInput style={styles.input} placeholder="Display name" value={i_displayName} onChangeText={(v) => {seti_DisplayName(v)}}></TextInput>
			<TextInput style={styles.input} placeholder="Email" value={i_email} textContentType='username' onChangeText={(v) => {seti_Email(v)}}></TextInput>
			<TextInput style={styles.input} placeholder="Phone Number" value={i_phoneNumber} textContentType="telephoneNumber" onChangeText={(v) => {seti_PhoneNumber(v)}}></TextInput>
			<TextInput style={styles.input} placeholder="Photo URL" value={i_photoURL} textContentType="URL" onChangeText={(v) => {seti_PhotoURL(v)}}></TextInput>


			<Button onPress={() => toUpdateUser()} title="Update user"></Button>
			<Button onPress={() => getInfo()} title="Get info"></Button>
			<Button onPress={() => returnToLogin()} title="Log out"></Button>
			{/* <View id="recaptcha-container" ref={captchaRef} style={{width: "100%", height: 200, backgroundColor: "#D5F5F5"}}></View> */}
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
	ChangeProfileScreen,
}