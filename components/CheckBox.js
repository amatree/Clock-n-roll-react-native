import { StyleSheet, Text, View, } from 'react-native';
import { useState } from 'react';

const CheckBox = ( {text, value, onValueChange, style, checkedStyle, checkedTextStyle} ) => {
	const [checked, setChecked] = useState(value)

	function handleClick() {
		setChecked(!checked);
		onValueChange(checked);
	}

	return (
		<View style={[{width: "100%"}, style]} 
			onStartShouldSetResponder={() => handleClick()}>
			<View style={[styles.checkbox, checked && (checkedStyle || styles.checked)]} />
			<Text style={[styles.text, checked && checkedTextStyle]}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	checkbox: {
		width: 12,
		height: 12,
		borderWidth: 0.5,
		borderRadius: "50%",
		marginTop: 6,
		backgroundColor: "white",
	},
	text: {
		position: "absolute",
		marginLeft: 24,
		fontFamily: "Maitree",
		color: "#959595",
	},
	checked: {
		backgroundColor: "black",
	},
});

export {
	CheckBox
}