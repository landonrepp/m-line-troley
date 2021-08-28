import React from 'react'
import { ImageURISource } from 'react-native';
import { Marker, LatLng } from 'react-native-maps';
import { MLineStops } from 'services';
import { UserCircle } from './UserCircle'

export function TrolleyPath() {
    const mLineMarker = require("../../assets/images/m-line-fit-sm.png") as ImageURISource;
    
    return (
        <>
            {MLineStops.map((stop, idx)=>
                <Marker key={idx} 
                    coordinate={{
                        latitude: stop.lat, longitude: stop.long
                    }}
                    description={stop.name}
                    image={mLineMarker}
                    anchor={{x:.5, y:.5}}
                    >
                </Marker>
            )}
        </>
    );
}
