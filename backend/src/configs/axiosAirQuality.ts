import axios from "axios";

const { ATLAS_AIR_QUALITY_LINK, SUBSCRIPTION_KEY } = process.env

export const axiosAirQuality = axios.create({
    baseURL: ATLAS_AIR_QUALITY_LINK,
    params: { 'subscription-key': SUBSCRIPTION_KEY }
});
