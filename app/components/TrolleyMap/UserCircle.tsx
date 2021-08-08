import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { Circle, Region } from "react-native-maps";
import { Dimensions } from "react-native";


export type UserCircleProps = {
    latDelta: number
}

export function UserCircle({ latDelta } : UserCircleProps){
    const [userCircleRadius, setUserCircleRadius] = useState(100);
    const window = Dimensions.get('window');
    const { width, height }  = window;
    const [userLocation, setUserLocation] = useState<Location.LocationObject|null>(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setUserLocation(location);
          console.log(`user location set ${JSON.stringify(location.coords)}`);
        })();
      }, []);

      return (
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
      );
}