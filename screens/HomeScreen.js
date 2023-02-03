import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, TouchableWithoutFeedback, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackActions } from '@react-navigation/routers';


function HomeScreen ( props ) {
	
	function returnToLogin() {
		props.navigation.dispatch(
			StackActions.replace("Login", "Home")
		);
	}

	function getInfo() {
		console.log(user.emailVerified);
	}

	return (
		<View>
			<Text>Hi, I am homescreen</Text>

			<Button onPress={() => getInfo()} title="Get info"></Button>
			<Button onPress={() => returnToLogin()} title="Log out"></Button>
		</View>
	)
}

export {
	HomeScreen,
}