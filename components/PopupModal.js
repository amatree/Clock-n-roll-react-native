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
import { ScrollView } from "react-native-gesture-handler";

// ===========================================================
// const setup:
// ===========================================================
// const [modalStates, setModalStates] = useState({
// 	visible: false,
// 	message: "",
// });
// const [modalOptions, setModalOptions] = useState({
// 	type: "c",
// 	child: undefined,
// 	onClose: () => {},
// 	onYes: () => {},
// 	onNo: () => {},
// 	onCancel: () => {},
// 	onOk: () => {},
// 	afterClose: () => {},
// });

// function ShowAlert(message, options = modalOptions) {
// 	setModalOptions({
// 		...modalOptions,
// 		...options,
// 	});
// 	setModalStates({
// 		...modalStates,
// 		message: message,
// 		visible: true,
// 	});
// }
//
// ===========================================================
// render setup:
// ===========================================================
// {modalStates.visible &&
// 	<PopupModal
// 		visible={modalStates.visible}
// 		message={modalStates.message}
// 		states={setModalStates}
// 		options={modalOptions}
// 	/>}
//
// MUST BE PLACED INSIDE THE NEEDED COMPONENT TO PREVENT PARENT RERENDERING

// type include:
// "c": close [0]
// "oc": ok/cancel [1]
// "yn": yes/no [2]
// "ync": yes/no/cancel [3]
// "y": yes [4]
const PopupModalTypes = ["c", "oc", "yn", "ync", "y"];

// giving "options" will override all action functions and props
function PopupModal({
	type = "c",
	message = "",
	states = {},
	options = {},
	child = undefined,
	onClose = () => {},
	onYes = () => {},
	onNo = () => {},
	onCancel = () => {},
	onOk = () => {},
	visible = false,
	afterClose = () => {},
	...props
}) {
	var typeSel =
		options.type === "" ? type.toLowerCase() : options.type.toLowerCase();
	if (!PopupModalTypes.includes(typeSel)) {
		typeSel = PopupModalTypes[0];
	}
	// console.log(typeSel);

	const [modalVisible, setModalVisible] = useState(visible);

	if (options.child !== undefined && options.child.props.children !== 0) {
		child = options.child;
	}

	return (
		<Modal
			animationType={props.animationType || "none"}
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!visible);
				if (states) {
					states({ visible: !visible });
				}
				options.afterClose.toString().length > 0
					? options.afterClose()
					: afterClose();
			}}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					{!child ? (
						<>
							<Text style={styles.modalText}>{message}</Text>
							<GetButtonComps
								type={typeSel}
								onClose={
									options.onClose.toString().length > 0
										? options.onClose
										: onClose
								}
								onYes={
									options.onYes.toString().length > 0 ? options.onYes : onYes
								}
								onNo={options.onNo.toString().length > 0 ? options.onNo : onNo}
								onCancel={
									options.onCancel.toString().length > 0
										? options.onCancel
										: onCancel
								}
								onOk={options.onOk.toString().length > 0 ? options.onOk : onOk}
								defaultCallback={() => {
									setModalVisible(!visible);
									if (states) {
										states({ visible: !visible });
									}
									options.afterClose.toString().length > 0
										? options.afterClose()
										: afterClose();
								}}
							/>
						</>
					) : (
						<>{child}</>
					)}
				</View>
			</View>
		</Modal>
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
		padding: 30,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 5,
		},
		shadowOpacity: 0.35,
		shadowRadius: 4,
		elevation: 5,
		minWidth: "70%",
		maxHeight: "75%",
	},
	modalText: {
		fontSize: 18,
		marginBottom: 15,
		textAlign: "center",
		fontFamily: "Maitree",
	},
});

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
			justifyContent: "flex-end",
			alignSelf: "flex-end",
		},
		button: {
			marginTop: 15,
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
		buttonFocus: {
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
					style={[styles.button, styles.buttonFocus]}
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
					style={[styles.button, styles.buttonFocus]}
					onPress={() => {
						defaultCallback();
						onYes();
					}}>
						<Text style={styles.textStyle}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.buttonNormal]}
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
					style={[styles.button, styles.buttonFocus]}
					onPress={() => {
						defaultCallback();
						onYes();
					}}>
						<Text style={styles.textStyle}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.buttonNormal]}
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
	} else if (type === "y") {
		return (
			<View style={styles.default}>
				<TouchableOpacity
					style={[styles.button, styles.buttonFocus]}
					onPress={() => {
						defaultCallback();
						onYes();
					}}>
						<Text style={styles.textStyle}>Yes</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.default}>
			<TouchableOpacity
				style={[styles.button, styles.buttonFocus]}
				onPress={() => {
					defaultCallback();
					onClose();
				}}>
				<ScrollView>
					<Text style={styles.textStyle}>Close</Text>
				</ScrollView>
			</TouchableOpacity>
		</View>
	);
}

export { PopupModal };
