import configData from "../config.json";

export type Configuration = {
    mataTrackerBaseUrl: string,
    altMataTrackerBaseUrl: string
}

export const ConfigValues: Configuration = {
    mataTrackerBaseUrl: configData.mataTrackerBaseUrl,
    altMataTrackerBaseUrl: configData.altMataTrackerBaseUrl
}
