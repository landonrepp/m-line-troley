import * as React from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { TrolleyCars } from "./TrolleyCars";
import { TrolleyPath } from "./TrolleyPath";
import { UserCircle } from "./UserCircle";


export default function TrolleyMap(){
    const initialLatDelta = .0372;
    const initialLongDelta = initialLatDelta;
    const [currentLatDelta, setCurrentLatDelta] = useState(initialLatDelta);

    const onRegionChange = (region: Region)=>{
        setCurrentLatDelta(region.latitudeDelta);
    }
    const mapStyles = [
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]

    return (
      <MapView 
      style={styles.map}
      customMapStyle={mapStyles}
      onRegionChange={onRegionChange}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
          latitude:32.7834,
          longitude: -96.7984,
          latitudeDelta:initialLatDelta,
          longitudeDelta:initialLongDelta
        }} >
        <UserCircle latDelta={currentLatDelta}  />
        <TrolleyPath />
        <TrolleyCars />
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