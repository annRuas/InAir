import { axiosInstance } from "../utils/axiosInstance";

export async function subscribeToNotification(uid: string, token: string) {
    const response = await axiosInstance.post('/notifications/add', {token}, {
        headers: {
            uid
        }
    })

    return response.data;
}

export async function unsubscribeFromNotification(uid: string) {
    const response = await axiosInstance.post('/notifications/remove', {}, {
        headers: {
            uid
        }
    })

    return response.data;
}