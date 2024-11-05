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

export async function getUserData(uid: string) {
    const response = await axiosInstance.get('/users/get-data', {
        headers: {
            uid
        }
    });
    
    return response.data;
}