import { StyleSheet, Text, TouchableWithoutFeedback, View, } from 'react-native';
import { useState } from 'react';

const CheckBox = ( {text, value, onValueChange, style, checkedStyle, checkedTextStyle} ) => {
	const [checked, setChecked] = useState(value)
	
	function handleClick() {
		setChecked(!checked);
		onValueChange(checked);
	}
	
	return (
		<TouchableWithoutFeedback onPress={() => handleClick()}>
			<View style={[{flexDirection: "row"}, style]}>
				<View style={[styles.checkbox, checked && (checkedStyle || styles.checked)]} />
				<Text style={[styles.text, checked && checkedTextStyle]}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	checkbox: {
		top: -3,
		width: 16,
		height: 16,
		borderWidth: 0.5,
		borderRadius: "50%",
		marginTop: 6,
		backgroundColor: "white",
	},
	text: {
		marginLeft: 12,
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