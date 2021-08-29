import configData from "../config.json";

export type Configuration = {
    mataTrackerBaseUrl: string
}

export const ConfigValues: Configuration = {
    mataTrackerBaseUrl: configData.mataTrackerBaseUrl
}
