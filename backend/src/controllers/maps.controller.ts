import { Request, Response } from "express";
import axios, { AxiosResponse } from 'axios';

const { ATLAS_GET_COUNTRY_LINK, ATLAS_GET_LOCATION_LINK, SUBSCRIPTION_KEY } = process.env;


async function getLocations(req: Request, res: Response) {
    const { address_name } = req.body;

    const getLocationsLink = `${ATLAS_GET_LOCATION_LINK}?api-version=2023-06-01&query=${address_name}&subscription-key=${SUBSCRIPTION_KEY}`;
    
    const locationsResponse: AxiosResponse = await axios.get(getLocationsLink);

    const returnArray = locationsResponse.data.features.map((e: any) => {
        const properties = e.properties
        return {
            "coordinates": properties.geocodePoints[0].geometry.coordinates,
            "address": properties.address.formattedAddress
        }
    });

    res.send({addresses: returnArray});
}

export { getLocations }