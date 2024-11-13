import { UserPreferences } from "../app/(pages)/auth/form";
import { Location } from "../components/SessionProvider";
import { axiosInstance } from "../utils/axiosInstance";

export async function createData(email: string, name: string, uid: string) {
    const response = await axiosInstance.post('/users/data', {
        email,
        name
    }, {
        headers: {
            uid
        }
    });

    return response.data;
}

export async function createPreferences(userPreferences: UserPreferences, uid: string) {
    const response = await axiosInstance.post('/users/preferences', userPreferences, {
        headers: {
            uid
        }
    })

    return response.data;
}

export async function getUserInformation(uid: string) {
    const response = await axiosInstance.get('/users/information', {
        headers: {
            uid
        },
        validateStatus: status => ((status >= 200 && status < 300) || status === 404 )
    });
    
    return {data: response.data, status: response.status};
}

export type UserLocations = {
  locations: Location[]  
}

export async function getUserLocations(uid: string) {
    const response = await axiosInstance.get<UserLocations>('/users/locations', {
        headers: {
            uid
        },
        validateStatus: status => ((status >= 200 && status < 300) || status === 404 )
    });
    
    return response.data;
}
