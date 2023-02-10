

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {default as MCIcon} from 'react-native-vector-icons/MaterialCommunityIcons';

import { HomeScreen } from './HomeScreen';
import { SettingsScreen } from '../SettingScreen';
import { TodoScreen } from '../TodoScreen';

import { Header } from '../../components/Header';

const Tab = createBottomTabNavigator();


function HomeScreenApp ( props ) {
	
	return (
		<>
			<Header text="Clock'n'roll"/>
			<Tab.Navigator>
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
			</Tab.Navigator>
		</>
	);
}

export {
	HomeScreenApp,
} 