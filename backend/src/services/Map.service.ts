import { AxiosInstance, AxiosResponse } from "axios";

export class MapService {

    axiosMap: AxiosInstance;
    apiVersion = '2023-06-01';

    constructor(axiosMap: AxiosInstance) {
        this.axiosMap = axiosMap;
    }

    async getLocations(addressName: string) {
        const locationsResponse: AxiosResponse = await this.axiosMap.get('', {
            params: {
                'api-version': this.apiVersion,
                'query': `${addressName}`
            }
        });

        return locationsResponse.data.features.map((e: any) => {
            const properties = e.properties
            return {
                "coordinates": properties.geocodePoints[0].geometry.coordinates,
                "address": properties.address.formattedAddress
            }
        });
    }
}