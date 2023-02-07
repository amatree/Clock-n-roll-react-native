

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {default as MCIcon} from 'react-native-vector-icons/MaterialCommunityIcons';

import { HomeScreen } from './HomeScreen';
import { SettingsScreen } from '../SettingScreen';
import { TodoScreen } from '../TodoScreen';

const Tab = createBottomTabNavigator();


function HomeScreenApp ( props ) {
	
	return (
		<Tab.Navigator>
		<Tab.Screen name="Home Page" component={HomeScreen} 
			options={{
				tabBarIcon: ({ color, size }) => (
					<MCIcon name="home" color={color} size={size} />
				),
			}}/>
		<Tab.Screen name="To-do List" component={TodoScreen} 
			options={{
				tabBarIcon: ({ color, size }) => (
					<MCIcon name="bell" color={color} size={size} />
				),
			}}/>
		<Tab.Screen name="Settings" component={SettingsScreen} 
			options={{
				tabBarIcon: ({ color, size }) => (
					<MCIcon name="cog" color={color} size={size} />
				),
			}}/>
		</Tab.Navigator>
	);
}

export {
	HomeScreenApp,
} 