import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, TouchableWithoutFeedback, Button } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

function Header ( {text, style, ...props} ) {



	const styles = StyleSheet.create({
		header: {
			zIndex: 0,
			backgroundColor: "white",
			height: 128,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			paddingTop: 55,
			shadowOpacity: 0.5,
			shadowOffset: {
				width: 1,
				height: 2,
			},
			elevation: 5,
		},
		text: {
			fontFamily: "MaitreeSemiBold",
			fontSize: 29,
			letterSpacing: 1,
		},
	});

	return (
		<View style={[style, styles.header]}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);

}


export {
	Header,
}