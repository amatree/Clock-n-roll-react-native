import react from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getAuth } from "firebase/auth";

function SettingsScreen ( {states, setStates, ...props} ) {
	const auth = getAuth();

	async function signOut() {
		auth.signOut().then(() => {
			props.navigation.replace("Sign In");
		});
	}
	return (
		<>
			<Text>Hello this is setting screen</Text>
			<Button title="Sign Out" onPress={() => signOut()}></Button>
		</>
	);
}

export {
	SettingsScreen,
}