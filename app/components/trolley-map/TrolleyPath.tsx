import React from 'react'
import { ImageURISource } from 'react-native';
import { Marker, LatLng, Polyline } from 'react-native-maps';
import { MLineStops, MLineTurnPoints } from "../../services/index";
import { UserCircle } from './UserCircle'

export function TrolleyPath() {
    const mLineMarker = require("../../assets/images/m-line-fit-sm.png") as ImageURISource;
    
    return (
        <>
            {MLineStops.map((stop, idx)=>
                <Marker key={idx} 
                    coordinate={{
                        latitude: stop.latitude, longitude: stop.longitude
                    }}
                    image={mLineMarker}
                    anchor={{x:.5, y:.5}}
                    >
                </Marker>
            )}
            <Polyline 
                coordinates={MLineTurnPoints.map(x=>({latitude: x.latitude, longitude: x.longitude}))}
                lineDashPattern={[0]} />
        </>
    );
}
