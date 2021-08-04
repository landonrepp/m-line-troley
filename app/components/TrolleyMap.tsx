import React, { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import MapView, { Circle, Marker, Region } from "react-native-maps";
import * as Location from 'expo-location';


export default function TrolleyMap(){
    const [userLocation, setUserLocation] = useState<Location.LocationObject|null>(null);
    const latDelta = .0372;
    const longDelta = latDelta;
    const [userCircleRadius, setUserCircleRadius] = useState(100);
    const window = Dimensions.get('window');
    const { width, height }  = window;

    const setUserRadiusByLatDelta = (delta: number)=>setUserCircleRadius(delta * width/height * 3500);

    const onRegionChange = (region: Region)=>{
        setUserRadiusByLatDelta(region.latitudeDelta);
    }

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          console.log(`user location set ${JSON.stringify(location.coords)}`);
          setUserRadiusByLatDelta(latDelta);
          setUserLocation(location);
          
        })();
      }, []);

    return (
        <MapView 
            style={styles.map}
            onRegionChange={onRegionChange}
            initialRegion={{
                latitude:32.7834,
                longitude: -96.7984,
                latitudeDelta:latDelta,
                longitudeDelta:longDelta
            }} >
            {
                userLocation == null?
                    null:
                    <Circle 
                        radius={userCircleRadius}
                        fillColor={'lightblue'}
                        center={{
                            latitude:userLocation.coords.latitude,
                            longitude: userLocation.coords.longitude
                        }}
                    />
            }
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