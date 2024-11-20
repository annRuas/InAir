import axios from "axios";

const { ATLAS_GET_LOCATION_LINK, SUBSCRIPTION_KEY } = process.env

export const axiosMap = axios.create({
    baseURL: ATLAS_GET_LOCATION_LINK,
    params: { 'subscription-key': SUBSCRIPTION_KEY }
});
