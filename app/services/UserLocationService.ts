import * as Location from 'expo-location';
import { LocationAccuracy, LocationObject } from "expo-location";


export type UserLocation = {
    latitude: number,
    longitude: number
}

export const WatchUserLocation = async (callback: (userLocation: UserLocation)=> any): Promise<()=>void> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return ()=>{};
    }

    const stopWatchingLocation = Location.watchPositionAsync({accuracy: LocationAccuracy.BestForNavigation},(result: LocationObject)=>{
        callback({
            latitude: result.coords.latitude,
            longitude: result.coords.longitude
        });
    });

    return (await stopWatchingLocation).remove;
}