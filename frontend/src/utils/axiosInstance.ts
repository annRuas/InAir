import axios from "axios";
import Constants from "expo-constants";

export const axiosInstance = axios.create({
    baseURL: `http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}`
})