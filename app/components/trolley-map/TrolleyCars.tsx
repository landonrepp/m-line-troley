import * as React from "react";
import { useEffect, useState } from "react";
import { ImageURISource, View, Image } from "react-native";
import { LatLng, Marker } from "react-native-maps";
import { GetTrolleyStatus, TrolleyStatus } from "../../services/index";
import { WatchTrolleyStatus } from "../../services/TrolleyStatusService";

export function TrolleyCars(){
    const [trolleyStatus, setTrolleyStatus] = useState<TrolleyStatus|null>(null);
    useEffect(() => {
        const removeWatch = WatchTrolleyStatus((status: TrolleyStatus)=>{
            setTrolleyStatus(status);
        })

        return removeWatch
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