import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import {
	DrawerParamList,
	TrackerPageParamList,
	EventsPageParamList,
	SchedulePageParamList,
} from '../types';
import TrolleyMapScreen from '../screens/TrolleyMapScreen';
import EventScreen from '../screens/EventScreen';
import {
	GetIsTrolleyAvailable,
	GetTrolleyAvailability,
} from '../services/TrolleyAvailabilityService';
import { TrolleyNotAvailableScreen } from '../screens/TrolleyNotAvailableScreen';
import { useEffect, useState } from 'react';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { createNavigationContainerRef, Link } from '@react-navigation/native';
import { openURL } from 'expo-linking';
const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator screenOptions={{ headerShown: true }}>
			<Drawer.Screen name="Tracker" component={TrackerPage} />
			<Drawer.Screen name="Schedule" component={SchedulePage} />
			<Drawer.Screen name="Events" component={EventsPage} />
		</Drawer.Navigator>
	);
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TrackerStack = createStackNavigator<TrackerPageParamList>();

function TrackerPage() {
	return (
		<TrackerStack.Navigator screenOptions={{ headerShown: false }}>
			<TrackerStack.Screen name="TrackerPage" component={TrolleyMapScreen} />
		</TrackerStack.Navigator>
	);
}

const EventsStack = createStackNavigator<EventsPageParamList>();

function EventsPage() {
	return (
		<EventsStack.Navigator screenOptions={{ headerShown: false }}>
			<EventsStack.Screen name="EventsPage" component={EventScreen} />
		</EventsStack.Navigator>
	);
}

const ScheduleStack = createStackNavigator<SchedulePageParamList>();
function SchedulePage() {
	return (
		<ScheduleStack.Navigator screenOptions={{ headerShown: false }}>
			<ScheduleStack.Screen name="SchedulePage" component={ScheduleScreen} />
		</ScheduleStack.Navigator>
	);
}
