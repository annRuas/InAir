import { Database } from "../configs/Database";
import { UserInformation } from "../interfaces/user-information.interface";
import { UserData } from "../schemas/user-data.schema";
import { UserPreferences } from "../schemas/user-preferences.schema";
import { ApiError } from "../utils/ApiError";
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

    async getUserData(): Promise<UserData> {
        const userData = await this.database.getDoc(this.usersDataCollection, this.uid) as UserData | undefined;
        if(!userData) {
            throw ApiError.notFound('User data');
        }

        return userData;
    }

    async getUserPreferences(): Promise<UserPreferences> {
        const userPreferences = await this.database.getDoc(this.usersPreferencesCollection, this.uid) as UserPreferences | undefined;
        if(!userPreferences) {
            throw ApiError.notFound('User preferences'); 
        }
        
        return userPreferences
    }

    async getUserInformation(): Promise<UserInformation> {
        const { name, email } = await this.getUserData();
        const userPreferences = await this.getUserPreferences();
        const diseases = this.parseDiseases(userPreferences);

        return {
            name,
            email,
            dateOfBirth: userPreferences.dateOfBirth,
            diseases,
            residence: ''
        }
    }

    parseDiseases(userPreferences: UserPreferences) {
        const possibleDiseases = ['Asbestosis', 'Asthma', 'ChronicBronchitis', 
                                  'Emphysema', 'LungCancer', 'Pneumonia', 'Pneumothorax', 
                                  'Silicosis', 'Tuberculosis'];
        
        return possibleDiseases.filter(e => userPreferences['has'+ e as keyof UserPreferences]);
    }

    async getCustomAirQuality(airQuality: AirQuality, latitude: string, longitude: string) {
        const globalIndex = await airQuality.getAirQuality(latitude, longitude);

        return globalIndex;
    }
}