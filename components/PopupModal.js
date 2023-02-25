import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
	Button,
	Modal,
	Alert,
	Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	withRepeat,
	withSpring,
	interpolate,
	withSequence,
	EasingNode,
	cancelAnimation,
} from "react-native-reanimated";

// type include:
// "c": close [0]
// "oc": ok/cancel [1]
// "yn": yes/no [2]
// "ync": yes/no/cancel [3]
const PopupModalTypes = ["c", "oc", "yn", "ync"];
function GetButtonComps({
		type = "c", 
		onClose = () => {}, 
		onYes = () => {}, 
		onNo = () => {}, 
		onCancel = () => {}, 
		onOk = () => {}, 
		defaultCallback = () => {},
		...props
	}) {

	const styles = StyleSheet.create({
		default: {
			...props.style,
			flexDirection: "row",
			alignSelf: "flex-end",
		},
		button: {
			marginTop: 30,
			marginHorizontal: 5,
			borderRadius: 10,
			padding: 10,
			shadowColor: "#000",
			shadowOffset: {
				width: 2,
				height: 5,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 2,
		},
		buttonOpen: {
			backgroundColor: "#F194FF",
		},
		buttonNormal: {
			backgroundColor: "#2196F3",
		},
		buttonNo: {
			backgroundColor: "#E26DE6",
		},
		textStyle: {
			color: "white",
			fontWeight: "bold",
			textAlign: "center",
			fontFamily: "MaitreeBold",
			fontSize: 18,
			marginHorizontal: 10,
		},
	});

	if (type === "oc") {
		return (
			<View style={styles.default}>
				<TouchableOpacity
					style={[styles.button, styles.buttonNormal]}
					onPress={() => {
						defaultCallback();
						onOk();
					}}>
					<Text style={styles.textStyle}>Ok</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.buttonNormal]}
					onPress={() => {
						defaultCallback();
						onCancel();
					}}>
					<Text style={styles.textStyle}>Cancel</Text>
				</TouchableOpacity>
			</View>
		);
	} else if (type === "yn") {
		return (
			<View style={styles.default}>
				<TouchableOpacity
					style={[styles.button, styles.buttonNormal]}
					onPress={() => {
						defaultCallback();
						onYes();
					}}>
					<Text style={styles.textStyle}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.buttonNo]}
					onPress={() => {
						defaultCallback();
						onNo();
					}}>
					<Text style={styles.textStyle}>No</Text>
				</TouchableOpacity>
			</View>
		);
	} else if (type === "ync") {
		return (
			<View style={styles.default}>
				<TouchableOpacity
					style={[styles.button, styles.buttonNormal]}
					onPress={() => {
						defaultCallback();
						onYes();
					}}>
					<Text style={styles.textStyle}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.buttonNo]}
					onPress={() => {
						defaultCallback();
						onNo();
					}}>
					<Text style={styles.textStyle}>No</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.buttonNormal]}
					onPress={() => {
						defaultCallback();
						onCancel();
					}}>
					<Text style={styles.textStyle}>Cancel</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.default}>
			<TouchableOpacity
				style={[styles.button, styles.buttonNormal]}
				onPress={() => {
					defaultCallback();
					onClose();
				}}>
				<Text style={styles.textStyle}>Close</Text>
			</TouchableOpacity>
		</View>
	);
}

function PopupModal({ type = "c", message, child, onClose, onYes, onNo, onCancel, onOk, modalVisible = false, setModalVisible, ...props }) {
	var typeSel = type.toLowerCase();
	if (!PopupModalTypes.includes(typeSel)) {
		typeSel = PopupModalTypes[0];
	}
	
	return (
		<View style={styles.background}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>{message}</Text>
						<GetButtonComps 
							type={typeSel}
							onClose={onClose} 
							onYes={onYes} 
							onNo={onNo} 
							onCancel={onCancel} 
							onOk={onOk} 
							defaultCallback={() => setModalVisible(!modalVisible)} 
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0000005D",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 27,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 5,
		},
		shadowOpacity: 0.35,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		fontSize: 18,
		marginBottom: 15,
		textAlign: "center",
		fontFamily: "Maitree"
	},
});

export { PopupModal };
