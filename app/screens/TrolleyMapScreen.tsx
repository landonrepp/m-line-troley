import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Text, View } from '../components/Themed';
import TrolleyMap from '../components/trolley-map/TrolleyMap';

export default function TrolleyMapScreen() {
  return (
    <TrolleyMap />
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
