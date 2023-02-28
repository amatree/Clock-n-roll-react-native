import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, TouchableWithoutFeedback, Button, PixelRatio, Platform } from 'react-native';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {default as MCIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";
import { Capitalize } from '../utils/Utils';

function Footer( {setScreens = undefined, ...props} ) {
	const [selections, setSelections] = useState({
		"profile": false,
		"history": false,
		"home": true,
		"export": false,
		"settings": false,
	});

	function setSelection( sel ) {
		var n_selections = {
			"profile": false,
			"history": false,
			"home": false,
			"export": false,
			"settings": false,
		};
		n_selections[sel] = true;
		// setScreens(n_selections);
		setSelections(n_selections);
		props.navigation.navigate(Capitalize(sel));
	}

	const styles = StyleSheet.create({
		footer: {
			position: "relative",
			bottom: 0,
			width: "100%",
			height: 95,
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			backgroundColor: "white",
			shadowOpacity: 1.5,
			shadowOffset: {
				width: 1,
				height: 2,
			},
			elevation: 5,
			borderTopWidth: Platform.OS === "android" && 0.5,
		},
	});

	function handleHomeBtn() {
		if (selections.home) return;
		// console.log("switching view to home :3");
		setSelection("home");
	}
	
	function handleProfileBtn() {
		if (selections.profile) return;
		// console.log("switching view to profile :3");
		setSelection("profile");
	}
	
	function handleHistoryBtn() {
		if (selections.history) return;
		// console.log("switching view to history :3");
		setSelection("history");
	}
	
	function handleExportBtn() {
		if (selections.export) return;
		// console.log("switching view to export :3");
		setSelection("export");
	}
	
	function handleSettingsBtn() {
		if (selections.settings) return;
		// console.log("switching view to settings :3");
		setSelection("settings");
	}

	return (
		<View style={styles.footer}>
			<FooterTab isSelected={selections.profile} tabIcon="person-outline" onPress={() => handleProfileBtn()} style={{paddingLeft: 12}} />
			<FooterTab isSelected={selections.history} tabIcon="history" iconType={"M"} onPress={() => handleHistoryBtn()} style={{paddingRight: 12}} />
			<FooterTab isSelected={selections.home} mainTab={true} tabIcon="home-outline" onPress={() => handleHomeBtn()} />
			<FooterTab isSelected={selections.export} tabIcon="database-export-outline" iconType={"M"} onPress={() => handleExportBtn()} style={{paddingLeft: 12}} />
			<FooterTab isSelected={selections.settings} tabIcon="settings-outline" iconType={""} onPress={() => handleSettingsBtn()} style={{paddingRight: 12}} />
		</View>
	);
}

function FooterTab ( {isSelected = false, mainTab = false, tabName = "", tabIcon = "", iconType = "", iconSize = 30, iconColor = "black", onPress, ...props} ) {	
	const styles = StyleSheet.create({
		tabWrapper: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			paddingBottom: !mainTab ? 12 : 0,
			width: "20%",
			height: "100%",
		},
		tabText: {
			fontFamily: "Maitree",
			fontSize: 16,
		},
		mainTab: {
			backgroundColor: "white",
			width: 90,
			height: 90,
			bottom: 25,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 45,
			shadowOpacity: 0.5,
			shadowOffset: {
				width: 3,
				height: 5,
			},
			elevation: 2,
		},
		selected: {
			position: "absolute",
			backgroundColor: "gray",
			opacity: 0.1,
			width: 60,
			height: 60,
			borderRadius: 30,
		},
	});

	function getIcon() {
		var r_icon = null;
		if (iconType === "" || !iconType) {
			r_icon = <Icon name={tabIcon} color={iconColor} size={mainTab ? iconSize + 6 : iconSize} />
		} else {
			r_icon = <MCIcon name={tabIcon} color={iconColor} size={mainTab ? iconSize + 6 : iconSize} />
		}
		return r_icon;
	}

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={[styles.tabWrapper, props.style, mainTab && styles.mainTab]}>
				{isSelected && <Text style={[props.style, {position: "absolute", bottom: mainTab ? 17 : 25}]}>_____</Text>}
				{/* {isSelected && <View style={[styles.selected]}></View>} */}
				{tabIcon && getIcon()}
				{tabName && <Text style={styles.tabText}>{tabName}</Text>}
			</View>
		</TouchableWithoutFeedback>
	);
}

export {
	Footer,
}
