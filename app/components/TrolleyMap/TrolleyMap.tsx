import React, { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import MapView, { Circle, Marker, Region } from "react-native-maps";
import { UserCircle } from "./UserCircle";


export default function TrolleyMap(){
    const initialLatDelta = .0372;
    const initialLongDelta = initialLatDelta;
    const [currentLatDelta, setCurrentLatDelta] = useState(initialLatDelta);

    const onRegionChange = (region: Region)=>{
        setCurrentLatDelta(region.latitudeDelta);
    }

    return (
        <MapView 
            style={styles.map}
            onRegionChange={onRegionChange}
            initialRegion={{
                latitude:32.7834,
                longitude: -96.7984,
                latitudeDelta:initialLatDelta,
                longitudeDelta:initialLongDelta
            }} >
            <UserCircle latDelta={currentLatDelta}  />
        </MapView>
    );
}


const styles = {
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    container:{
        
    }
}