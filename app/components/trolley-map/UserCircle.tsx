import React, { useEffect, useState } from "react";
import { Circle, Region } from "react-native-maps";
import { Dimensions } from "react-native";
import { UserLocation, WatchUserLocation } from "../../services/index";



export type UserCircleProps = {
    latDelta: number
}

export function UserCircle({ latDelta } : UserCircleProps){
    const userCircleScale = 1200;
    const [userCircleRadius, setUserCircleRadius] = useState(latDelta * userCircleScale);
    const window = Dimensions.get('window');
    const { width, height }  = window;
    const [userLocation, setUserLocation] = useState<UserLocation|null>(null);

    useEffect(()=>{
      setUserCircleRadius(latDelta * userCircleScale);
    }, [latDelta]);

    useEffect(() => {
      const removeUserLocationListener = WatchUserLocation((currentCoords: UserLocation)=>{
        setUserLocation(currentCoords);
      });
      return ()=>{
        removeUserLocationListener
          .then(result=>result());
      }
    }, []);

    return (
      userLocation == null?
          null:
          <Circle 
              radius={userCircleRadius}
              fillColor={'lightblue'}
              center={{
                  latitude:userLocation.latitude,
                  longitude: userLocation.longitude
              }}
          />
    );
}