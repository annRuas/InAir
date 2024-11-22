import { axiosInstance } from "../utils/axiosInstance";


export async function getMatchedLocations(location: string) {
    const response = await axiosInstance.post('/maps/', {
       address_name: location
    });

    return response.data;
}
