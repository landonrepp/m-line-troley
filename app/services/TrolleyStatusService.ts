import axios, { AxiosResponse } from 'axios';
import { ImageURISource } from 'react-native';
import { LatitudeAndLongitude } from './LatitudeAndLongitude';
import { ConfigValues } from 'services';

export type TrolleyCarStatus = {
    coords: LatitudeAndLongitude,
    carNumber: number,
    imageSource: ImageURISource|null
}

export type TrolleyStatus = {
    trollies: TrolleyCarStatus[],
    bannerContent: string,
    timeRecieved: Date
}

const getImageSource = (carNumber:number):ImageURISource =>{
    switch(carNumber){
        case 186: return require(`../assets/images/trollies/186.png`);
        case 369: return require(`../assets/images/trollies/369.png`);
        case 636: return require(`../assets/images/trollies/636.png`);
        case 122: return require(`../assets/images/trollies/122.png`);
        case 754: return require(`../assets/images/trollies/754.png`);
        case 7169: return require(`../assets/images/trollies/7169.png`);
        case 4614: return require(`../assets/images/trollies/4614.png`);
        default: return require(`../assets/images/trollies/186.png`);
    }
}

export function GetTrolleyStatus(){
    return axios.get<any>(`${ConfigValues.mataTrackerBaseUrl}/allCars`)
        .then((result) => {
            if(result.status != 200){
                return null;
            }
            
            const data = result.data;
            // returns array with latitude, longitude, 
            // and a key to know what cycle the car is on
            // only the empty string in the third spot 
            // indicates that the trolley is in service
            // one index of the object is a header, index 32768
            const trollies = Object.keys(data)
                .filter(x => x !== '32768')
                .map(x => ({
                    coords: {
                        latitude: data[x][0],
                        longitude: data[x][1]
                    },
                    carNumber: Number(x),
                    imageSource: getImageSource(Number(x))
                } as TrolleyCarStatus));

            return {
                bannerContent: data["32768"],
                trollies: trollies,
                timeRecieved: new Date()
            } as TrolleyStatus;
        });
}