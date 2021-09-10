import { NavigationProp, useNavigation } from '@react-navigation/core';
import { openURL } from 'expo-linking';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DrawerParamList } from '../types';

export default function EventScreen() {
	const navigation = useNavigation();
	const navigationRef = useNavigation<NavigationProp<DrawerParamList>>();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			navigationRef.navigate('Tracker');
			openURL('http://www.mata.org/about/news-events/');
		});

		return unsubscribe;
	}, [navigation, navigationRef]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab Two</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
