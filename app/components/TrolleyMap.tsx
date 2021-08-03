import React from "react";
import { Dimensions } from "react-native";
import MapView from "react-native-maps";


export default function TrolleyMap(){
    return (
        <MapView 
            style={styles.map}
            initialRegion={{
                latitude:32.7834,
                longitude: -96.7984,
                latitudeDelta:.0372,
                longitudeDelta:.0372
            }} 
        />
    );
}


const styles = {
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
}