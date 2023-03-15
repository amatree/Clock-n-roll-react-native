import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { default as MCIcon } from "react-native-vector-icons/MaterialCommunityIcons";

import { ProfileScreen } from "./ProfileScreens";
import { HistoryScreen } from "./HistoryScreens";
import { ExportScreen } from "./ExportScreens";
import { SettingsScreen } from "./SettingScreens";
import { TodoScreen } from "./TodoScreens";
import { HomeScreen } from "./HomeScreen";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import { useState, useEffect, useMemo } from "react";
import { PopupModal } from "../../components/PopupModal";
import { AllJobsScreen } from "./AllJobsScreen";

const Tab = createBottomTabNavigator();

function HomeScreenApp(props) {
	// modal setup
	const [modalStates, setModalStates] = useState({
		visible: false,
		message: "",
	});
	const [modalOptions, setModalOptions] = useState({
		type: "c",
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

	const [foregroundOptions, setForegroundOptions] = useState({
		active: false,
		color: "#00000000",
		child: <></>,
	});

	function ToggleForeground({ opacity = 0.7, child = <></> }) {
		const transparency =
			"#000000" + Math.floor((1 - Math.min(opacity, 1)) * 255).toString(16);
		setForegroundOptions({
			...foregroundOptions,
			active: !foregroundOptions.active,
			color: !foregroundOptions.active ? transparency : "#00000000",
			child: child,
		});
	}

	const [onHeaderBack, setOnHeaderBack] = useState({
		shown: false,
		callback: () => {},
	});

	// footer props
	const [showFooter, setShowFooter] = useState(true);
	const [showHeader, setShowHeader] = useState(true);

	// child props
	const childProps = {
		ShowAlert: ShowAlert,
		ToggleForeground: ToggleForeground,
		onHeaderBack: onHeaderBack,
		showHeader: setShowHeader,
		_showHeader: showHeader,
		setOnHeaderBack: setOnHeaderBack,
		showFooter: setShowFooter,
		_showFooter: showFooter,
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
			<TodoScreen
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
			<AllJobsScreen
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

	useEffect(() => {
		
	}, []);

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
			<View style={styles.container}>
				<Header
					text="Clock'n'roll"
					onBackButtonPress={() => {}}
					backButtonShown={onHeaderBack.shown}
					{...props}
					{...childProps}
				/>
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
				<Tab.Navigator
					initialRouteName="Home"
					tabBar={(tabProps) => <Footer {...tabProps} {...childProps} {...props} />}>
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
				{foregroundOptions.active && (
					<View
						style={{
							position: "absolute",
							backgroundColor: foregroundOptions.color,
							width: "100%",
							height: "100%",
							zIndex: 99,
						}}>
						{foregroundOptions.child}
					</View>
				)}
			</View>
		</>
	);
}

export { HomeScreenApp };
