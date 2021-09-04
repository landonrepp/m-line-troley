import * as React from "react";
import { useEffect, useState } from "react";
import { ImageURISource, View, Image } from "react-native";
import { LatLng, Marker } from "react-native-maps";
import { GetTrolleyStatus, TrolleyStatus } from "../../services/index";

export function TrolleyCars(){
    const [trolleyStatus, setTrolleyStatus] = useState<TrolleyStatus|null>(null);
    const setTrolleyStatusAsync = () =>{
        GetTrolleyStatus()
            .then(result=>{
                if(!result)
                    return;
                    
                setTrolleyStatus(result!);
            });
    }
    useEffect(() => {
        setTrolleyStatusAsync();
        const intervalId = setInterval(()=>{
            setTrolleyStatusAsync();
        }, 5000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);
    return (
        <>
            {trolleyStatus && trolleyStatus!.trollies.map(
                x=> 
                    <Marker
                        key={x.carNumber}
                        coordinate = {({ latitude: x.coords.latitude, longitude: x.coords.longitude } as LatLng)} >
                        <View>
                            <Image source={x.imageSource!} style={{width: 30, height: 30}} />
                        </View>
                    </Marker>
            )}
        </>
    );
}