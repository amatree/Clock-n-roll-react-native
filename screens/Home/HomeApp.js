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

import { useState, useEffect } from "react";

// const Tab = createBottomTabNavigator();

function HomeScreenApp( props ) {
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
				{...props}
			/>
		),
		history: (
			<HistoryScreen
				states={historyScreenStates}
				setStates={setHistoryScreenStates}
				{...props}
			/>
		),
		home: (
			<HomeScreen
				states={homeScreenStates}
				setStates={setHomeScreenStates}
				{...props}
			/>
		),
		export: (
			<TodoScreen
				states={exportScreenStates}
				setStates={setExportScreenStates}
				{...props}
			/>
		),
		settings: (
			<SettingsScreen
				states={settingsScreenStates}
				setStates={setSettingsScreenStates}
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

	useEffect(() => {
		
	}, [renderingScreens]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			maxHeight: "77%",
		},
	});
	return (
		<>
			<Header text="Clock'n'roll" />
			<View style={styles.container}>
				{renderingScreens.profile ? (
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
				)}
				{/* <Tab.Navigator>
			<Tab.Screen name="Home Page" component={HomeScreen} 
			options={{
				tabBarIcon: ({ color, size }) => (
					<MCIcon name="home" color={color} size={size} />
					),
					headerShown: false,
				}}/>
				<Tab.Screen name="To-do List" component={TodoScreen} 
				options={{
					tabBarIcon: ({ color, size }) => (
						<MCIcon name="bell" color={color} size={size} />
						),
						headerShown: false,
					}}/>
					<Tab.Screen name="Settings" component={SettingsScreen} 
					options={{
						tabBarIcon: ({ color, size }) => (
							<MCIcon name="cog" color={color} size={size} />
							),
							headerShown: false,
						}}/>
					</Tab.Navigator> */}
			</View>

			<Footer screens={screens} setScreens={setRenderingScreens} />
		</>
	);
}

export { HomeScreenApp };
