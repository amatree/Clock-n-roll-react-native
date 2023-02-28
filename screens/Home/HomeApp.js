import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { default as MCIcon } from "react-native-vector-icons/MaterialCommunityIcons";

import { ProfileScreen } from "./ProfileScreen";
import { HistoryScreen } from "./HistoryScreen";
import { HomeScreen } from "./HomeScreen";
import { ExportScreen } from "./ExportScreen";
import { SettingsScreen } from "./SettingScreen";
import { TodoScreen } from "./TodoScreen";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import { useState, useEffect, useMemo } from "react";
import { PopupModal } from "../../components/PopupModal";

const Tab = createBottomTabNavigator();

function HomeScreenApp(props) {
	// modal setup
	const [modalStates, setModalStates] = useState({
		visible: false,
		message: "",
	});
	const [modalOptions, setModalOptions] = useState({
		type: "ync",
		child: undefined,
		onClose: () => {},
		onYes: () => {},
		onNo: () => {},
		onCancel: () => {},
		onOk: () => {},
		afterClose: () => {},
	});

	function ShowAlert(message, options = modalOptions) {
		setModalOptions({
			...modalOptions,
			...options,
		});
		setModalStates({
			...modalStates,
			message: message,
			visible: true,
		});
	}

	// child props
	const childProps = {
		ShowAlert: ShowAlert,
	};

	// screens setup
	const [profileScreenStates, setProfileScreenStates] = useState({
		firstSync: false,
	});
	const [historyScreenStates, setHistoryScreenStates] = useState({
		firstSync: false,
	});
	const [homeScreenStates, setHomeScreenStates] = useState({
		firstSync: false,
	});
	const [exportScreenStates, setExportScreenStates] = useState({
		firstSync: false,
	});
	const [settingsScreenStates, setSettingsScreenStates] = useState({
		firstSync: false,
	});

	const screens = {
		profile: (
			<ProfileScreen
				states={profileScreenStates}
				setStates={setProfileScreenStates}
				{...childProps}
				{...props}
			/>
		),
		history: (
			<HistoryScreen
				states={historyScreenStates}
				setStates={setHistoryScreenStates}
				{...childProps}
				{...props}
			/>
		),
		home: (
			<HomeScreen
				states={homeScreenStates}
				setStates={setHomeScreenStates}
				{...childProps}
				{...props}
			/>
		),
		export: (
			<TodoScreen
				states={exportScreenStates}
				setStates={setExportScreenStates}
				{...childProps}
				{...props}
			/>
		),
		settings: (
			<SettingsScreen
				states={settingsScreenStates}
				setStates={setSettingsScreenStates}
				{...childProps}
				{...props}
			/>
		),
	};

	const [renderingScreens, setRenderingScreens] = useState({
		profile: false,
		history: false,
		home: true,
		export: false,
		settings: false,
	});

	useEffect(() => {}, [renderingScreens]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
		},
	});
	return (
		<>
			{modalStates.visible && (
				<PopupModal
					visible={modalStates.visible}
					message={modalStates.message}
					states={setModalStates}
					options={modalOptions}
				/>
			)}
			<Header text="Clock'n'roll" />
			<View style={styles.container}>
				{/* {renderingScreens.profile ? (
					screens.profile
				) : renderingScreens.history ? (
					screens.history
				) : renderingScreens.home ? (
					screens.home
				) : renderingScreens.export ? (
					screens.export
				) : renderingScreens.settings ? (
					screens.settings
				) : (
					<Text>Nothin' here :3</Text>
				)} */}
				<Tab.Navigator initialRouteName="Home" tabBar={(tabProps) => <Footer {...tabProps} />}>
					<Tab.Screen name="Profile" options={{ headerShown: false }}>
						{() => screens.profile}
					</Tab.Screen>
					<Tab.Screen name="History" options={{ headerShown: false }}>
						{() => screens.history}
					</Tab.Screen>
					<Tab.Screen name="Home" options={{ headerShown: false }}>
						{() => screens.home}
					</Tab.Screen>
					<Tab.Screen name="Export" options={{ headerShown: false }}>
						{() => screens.export}
					</Tab.Screen>
					<Tab.Screen name="Settings" options={{ headerShown: false }}>
						{() => screens.settings}
					</Tab.Screen>
					{/* <Tab.Screen
						name="Home Page"
						component={HomeScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MCIcon name="home" color={color} size={size} />
							),
							headerShown: false,
						}}
					/>
					<Tab.Screen
						name="To-do List"
						component={TodoScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MCIcon name="bell" color={color} size={size} />
							),
							headerShown: false,
						}}
					/>
					<Tab.Screen
						name="Settings"
						component={SettingsScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MCIcon name="cog" color={color} size={size} />
							),
							headerShown: false,
						}}
					/> */}
				</Tab.Navigator>
			</View>
		</>
	);
}

export { HomeScreenApp };
