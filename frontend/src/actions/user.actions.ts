import { UserPreferences } from "../app/(pages)/auth/form";
import { axiosInstance } from "../utils/axiosInstance";

export async function createData(email: string, name: string, uid: string) {
    const response = await axiosInstance.post('/users/create-data', {
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
    const response = await axiosInstance.post('/users/create-preferences', userPreferences, {
        headers: {
            uid
        }
    })

    return response.data;
}

export async function getUserInformation(uid: string) {
    const response = await axiosInstance.get('/users/get-information', {
        headers: {
            uid
        },
        validateStatus: status => ((status >= 200 && status < 300) || status === 404 )
    });
    
    return {data: response.data, status: response.status};
}
