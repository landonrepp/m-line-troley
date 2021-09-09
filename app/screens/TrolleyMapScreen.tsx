import * as React from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { View } from "../components/Themed";
import TrolleyMap from "../components/trolley-map/TrolleyMap";
import { TrolleyMapHeader } from "../components/trolley-map/TrolleyMapHeader";
import { GetIsTrolleyAvailable } from "../services/TrolleyAvailabilityService";
import { TrolleyNotAvailableScreen } from "./TrolleyNotAvailableScreen";

export default function TrolleyMapScreen() {
  const [isAvailable, setIsAvailable] = React.useState<boolean>(true);
  useEffect(() => {
    setIsAvailable(GetIsTrolleyAvailable());
    const intervalId = setInterval(()=>{
      setIsAvailable(GetIsTrolleyAvailable());
    }, 5000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isAvailable ? <TrolleyMapHeader /> : <TrolleyNotAvailableScreen />}
      </View>
      <View style={styles.map}>
        <TrolleyMap />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: "flex-start",
    width:"100%"
  },
  map: {
    flex: 1,
  },
});
