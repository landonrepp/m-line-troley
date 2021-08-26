import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { Circle, Region } from "react-native-maps";
import { Dimensions } from "react-native";
import { LocationAccuracy } from "expo-location";


export type UserCircleProps = {
    latDelta: number
}

export function UserCircle({ latDelta } : UserCircleProps){
    const userCircleScale = 1200;
    const [userCircleRadius, setUserCircleRadius] = useState(latDelta * userCircleScale);
    const window = Dimensions.get('window');
    const { width, height }  = window;
    const [userLocation, setUserLocation] = useState<Location.LocationObject|null>(null);

    useEffect(()=>{
      setUserCircleRadius(latDelta * userCircleScale);
    }, [latDelta]);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
          
          const stopWatchingLocation = Location.watchPositionAsync({accuracy: LocationAccuracy.BestForNavigation},(result)=>{
            setUserLocation(result);
          });

          return stopWatchingLocation;
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