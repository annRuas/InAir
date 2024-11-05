import axios from "axios";
import Constants from "expo-constants";

export async function getAqiLevel(latitude: string, longitude: string) {
    const response = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/air-quality/`, {
          latitude,
          longitude,
    })

    return response.data.globalIndex;
}

export async function getAqiLevelCustom(latitude: string, longitude: string, uid: string) {
    const response = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/air-quality/custom`, {
        latitude,
        longitude,
        uid
    });

    return response.data;

}