import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { DrawerParamList, TabOneParamList, TabTwoParamList } from '../types';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import MenuIcon from '../components/MenuIcon';
const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown:true }}>
      <Drawer.Screen
        name="Tracker"
        component={TrackerPage}/>
      <Drawer.Screen
        name="Events"
        component={EventsPage}
      />
    </Drawer.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TrackerStack = createStackNavigator<TabOneParamList>();

function TrackerPage() {
  return (
    <TrackerStack.Navigator screenOptions={{headerShown: false }}>
      <TrackerStack.Screen
        name="Tracker"
        component={TabOneScreen}
      />
    </TrackerStack.Navigator>
  );
}

const EventsStack = createStackNavigator<TabTwoParamList>();

function EventsPage() {
  return (
    <EventsStack.Navigator screenOptions={{headerShown: false}}>
      <EventsStack.Screen
        name="Events"
        component={TabTwoScreen}
      />
    </EventsStack.Navigator>
  );
}
