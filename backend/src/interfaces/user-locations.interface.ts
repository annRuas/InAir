

type Location = {
    name: string;
    coordinates: {
        longitude: string;
        latitude: string;
    }
}

export type UserLocations = {
    locations: Location[] 
} 