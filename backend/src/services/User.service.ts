import { Database } from "../configs/Database";
import { AirQuality } from "./AirQuality.service";

export class UserService {
    
    userPreferencesCollection = 'users-data';
    database: Database;
    uid: string;

    constructor(database: Database, uid: string) {
        this.database   = database;
        this.uid        = uid;
    }

    async createPreferences(name: string, email: string) {
        await this.database.createDoc(this.userPreferencesCollection, this.uid, {
            name,
            email
        });
    }

    async getCustomAirQuality(airQuality: AirQuality, latitude: string, longitude: string) {
        const globalIndex = await airQuality.getAirQuality(latitude, longitude);

        const userPreferences = await this.database.getDoc(this.userPreferencesCollection, this.uid);

        return globalIndex;
    }
}