import { Database } from "../configs/Database";
import { UserData } from "../schemas/user-data.schema";
import { UserPreferences } from "../schemas/user-preferences.schema";
import { AirQuality } from "./AirQuality.service";

export class UserService {
    
    usersDataCollection = 'users-data';
    usersPreferencesCollection = 'users-preferences';
    database: Database;
    uid: string;

    constructor(database: Database, uid: string) {
        this.database   = database;
        this.uid        = uid;
    }

    async createData({name, email}: UserData) {
        await this.database.createDoc(this.usersDataCollection, this.uid, {
            name,
            email
        });
    }

    async createPreferences(preferences: UserPreferences) {
        await this.database.createDoc(this.usersPreferencesCollection, this.uid, preferences);
    }

    async getUserData() {
        return await this.database.getDoc(this.usersDataCollection, this.uid);
    }

    async getCustomAirQuality(airQuality: AirQuality, latitude: string, longitude: string) {
        const globalIndex = await airQuality.getAirQuality(latitude, longitude);

        return globalIndex;
    }
}