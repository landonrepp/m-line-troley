import React from 'react'
import { ImageURISource, View, Image } from 'react-native';
import { Marker, LatLng, Polyline } from 'react-native-maps';
import { MLineStops, MLineTurnPoints } from "../../services/index";
import { UserCircle } from './UserCircle'

const mLineMarker = require("../../assets/images/m-line-fit-sm.png") as ImageURISource;

export function TrolleyPath() {
    return (
        <>
            {MLineStops.map((stop, idx)=>
                <Marker key={idx} 
                    coordinate={{
                        latitude: stop.latitude, 
                        longitude: stop.longitude
                        
                    }}
                    >
                        <View>
                            <Image source={mLineMarker} style={{width: 15, height: 15}} />
                        </View>
                </Marker>
            )}
            <Polyline 
                coordinates={MLineTurnPoints.map(x=>({latitude: x.latitude, longitude: x.longitude}))}
                lineDashPattern={[0]} />
        </>
    );
}
