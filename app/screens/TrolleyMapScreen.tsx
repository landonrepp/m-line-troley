import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Text, View } from "../components/Themed";
import TrolleyMap from "../components/trolley-map/TrolleyMap";
import { TrolleyMapHeader } from "../components/trolley-map/TrolleyMapHeader";

export default function TrolleyMapScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TrolleyMapHeader />
      </View>
      <View style={styles.map}>
        <TrolleyMap />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    alignSelf:"flex-start"
  },
  map: {
    flex: 1,
  },
});
