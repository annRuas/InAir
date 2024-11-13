import { axiosInstance } from "../utils/axiosInstance";

type Coordinates = {
    latitude: string;
    longitude: string;
}

type ResponseAirQualityGeneric = {
    globalIndex: number;
}

type ResponseAirQualityCustom = {
    globalIndex: number;
    customMessage: string;
}

export type ResponseAirQuality = {
    globalIndex: number;
    customMessage: string | undefined;
}

async function getAirQualityGeneric({latitude, longitude}: Coordinates) {
    const response = await axiosInstance.post<ResponseAirQualityGeneric>('/air-quality/', {
          latitude,
          longitude,
    })

    return response.data;
}

async function getAirQualityCustom({latitude, longitude}: Coordinates, uid: string) {
    const response = await axiosInstance.post<ResponseAirQualityCustom>('/air-quality/custom', {
        latitude,
        longitude,
        uid
    });

    return response.data;

}
export async function getAirQuality(coordinates: Coordinates, uid: string | null): Promise<ResponseAirQuality> {
   return uid === null ? await getAirQualityGeneric(coordinates) as ResponseAirQuality :  await getAirQualityCustom(coordinates, uid) as ResponseAirQuality; 
}