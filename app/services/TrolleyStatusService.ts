import axios, { AxiosResponse } from "axios";
import { ImageURISource } from "react-native";
import { LatitudeAndLongitude } from "./LatitudeAndLongitude";
import { ConfigValues } from "../services/Configurations";
import {parse as ParseHtml} from 'fast-html-parser';

export type TrolleyCarStatus = {
	coords: LatitudeAndLongitude;
	carNumber: number;
	imageSource: ImageURISource | null;
};

export type TrolleyStatus = {
	trollies: TrolleyCarStatus[];
	bannerContent: string;
	timeReceived: Date;
};

const getImageSource = (carNumber: number): ImageURISource => {
	switch (carNumber) {
		case 186:
			return require(`../assets/images/trollies/186.png`);
		case 369:
			return require(`../assets/images/trollies/369.png`);
		case 636:
			return require(`../assets/images/trollies/636.png`);
		case 122:
			return require(`../assets/images/trollies/122.png`);
		case 754:
			return require(`../assets/images/trollies/754.png`);
		case 7169:
			return require(`../assets/images/trollies/7169.png`);
		case 4614:
			return require(`../assets/images/trollies/4614.png`);
		default:
			return require(`../assets/images/trollies/186.png`);
	}
};

function getTrolleyStatusByBaseUrl(baseUrl:string):Promise<TrolleyStatus | null>{
	return axios
		.get<any>(`${baseUrl}/allCars`)
		.then((result) => {
			if (result.status != 200) {
				return null;
			}

			const data = result.data;
			// returns array with latitude, longitude,
			// and a key to know what cycle the car is on
			// only the empty string in the third spot
			// indicates that the trolley is in service
			// one index of the object is a header, index 32768
			const trollies = Object.keys(data)
				.filter((x) => x !== "32768")
				.map(
					(x) =>
						({
							coords: {
								latitude: data[x][0],
								longitude: data[x][1],
							},
							carNumber: Number(x),
							imageSource: getImageSource(Number(x)),
						} as TrolleyCarStatus)
				);

			return {
				bannerContent: ParseHeaderHtml(data["32768"]),
				trollies: trollies,
				timeReceived: new Date(),
			} as TrolleyStatus;
		})
		.catch((e) => {
			console.warn(e);
			return null;
		});
}

async function GetTrolleyStatus() {
	try{
		let status = await getTrolleyStatusByBaseUrl(ConfigValues.mataTrackerBaseUrl);
		if (status == null) {
			status = await getTrolleyStatusByBaseUrl(ConfigValues.altMataTrackerBaseUrl);
		}
		return status;
	}
	catch(exception){
		console.error(exception);
		return null;
	}
}

function ParseHeaderHtml(rawHtml:string){
	return ParseHtml(rawHtml).rawText;
}

function CreateTrolleyWatch(){
    const watchTrolleySubscriptions:((latLng:TrolleyStatus)=>void)[] = [];
    let lastTrolleyStatus: TrolleyStatus | null;
    const setLocalStatus = () => GetTrolleyStatus()
    .then(result=>{
        lastTrolleyStatus = result;
        if(result == null){
            console.warn("trolley status is null in watch");
            return;
        }
        watchTrolleySubscriptions.forEach(fn=>{
            fn(result);
        });
        return result;
    })
    setInterval(()=>{
        if(watchTrolleySubscriptions.length > 0){
            setLocalStatus();
        }
    }, 5000)
    return function WatchTrolleyStatus(x:(status:TrolleyStatus)=>void) : ()=>void{
        watchTrolleySubscriptions.push(x);

        if(lastTrolleyStatus != null){
            x(lastTrolleyStatus);
        }
        else{
            setLocalStatus();
        }

        return ()=>{
            const index = watchTrolleySubscriptions.indexOf(x);
            if (index == -1) {
                console.warn("unsubscribe from trolley location service may have failed")
                return;
            }
            watchTrolleySubscriptions.splice(index, 1);
        }
    }
}

const WatchTrolleyStatus = CreateTrolleyWatch();
export {
    WatchTrolleyStatus
};