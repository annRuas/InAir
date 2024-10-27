import { AxiosInstance, AxiosResponse } from "axios";


export class AirQuality {

    axiosAirQuality: AxiosInstance;
    apiVersion = '1.1';

    constructor(axiosAirQuality: AxiosInstance) {
        this.axiosAirQuality = axiosAirQuality;
    }

    async getAirQuality(latitude: string, longitude: string) {
        const response: AxiosResponse = await this.axiosAirQuality.get('/current/json', {params: {
            'api-version': this.apiVersion,
            'query':`${latitude}, ${longitude}`
        }});

        return response.data.results[0].globalIndex;
    }
}