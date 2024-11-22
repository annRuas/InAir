import { Database } from "../configs/Database";
import { UserInformation } from "../interfaces/user-information.interface";
import { Location, UserLocations } from "../interfaces/user-locations.interface";
import { UserData } from "../schemas/user-data.schema";
import { UserPreferences } from "../schemas/user-preferences.schema";
import { ApiError } from "../utils/ApiError";
import { calculateAQILevel } from "../utils/utis";
import { AirQuality } from "./AirQuality.service";

function getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export class UserService {

    usersDataCollection = 'users-data';
    usersPreferencesCollection = 'users-preferences';
    usersLocationsCollection = 'users-locations';
    database: Database;
    uid: string;

    constructor(database: Database, uid: string) {
        this.database = database;
        this.uid = uid;
    }

    async createData({ name, email }: UserData) {
        await this.database.createDoc(this.usersDataCollection, this.uid, {
            name,
            email
        });

        await this.database.createDoc(this.usersLocationsCollection, this.uid, {
            locations: []
        });
    }

    async createPreferences(preferences: UserPreferences) {
        await this.database.createDoc(this.usersPreferencesCollection, this.uid, preferences);
    }

    async addLocation(location: Location) {
        const locations = await this.database.getDoc(this.usersLocationsCollection, this.uid);
        if (locations === undefined) {
            throw ApiError.notFound('User locations');
        }

        locations.locations.push(location);
        await this.database.updateDoc(this.usersLocationsCollection, this.uid, locations);
    }

    async getUserData(): Promise<UserData> {
        const userData = await this.database.getDoc(this.usersDataCollection, this.uid) as UserData | undefined;
        if (!userData) {
            throw ApiError.notFound('User data');
        }

        return userData;
    }

    async getUserPreferences(): Promise<UserPreferences> {
        const userPreferences = await this.database.getDoc(this.usersPreferencesCollection, this.uid) as UserPreferences | undefined;
        if (!userPreferences) {
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

    async getUserLocations(): Promise<UserLocations> {
        const userLocations = await this.database.getDoc(this.usersLocationsCollection, this.uid) as UserLocations | undefined;
        if (!userLocations) {
            throw ApiError.notFound('User locations');
        }

        return userLocations;
    }

    parseDiseases(userPreferences: UserPreferences) {
        const possibleDiseases = ['Asbestosis', 'Asthma', 'ChronicBronchitis',
            'Emphysema', 'LungCancer', 'Pneumonia', 'Pneumothorax',
            'Silicosis', 'Tuberculosis'];

        return possibleDiseases.filter(e => userPreferences['has' + e as keyof UserPreferences]);
    }

    async calculateSensitivityScore() {
        let sensitivityScore = 0;

        const userPreferences: any = await this.getUserPreferences();
        const weights = await this.database.getDoc(this.usersPreferencesCollection, 'preferences-weight');
        if (weights === undefined) {
            throw ApiError.notFound('Weights document');
        }

        Object.keys(weights).forEach(e => {
            if (userPreferences[e]) {
                sensitivityScore += weights[e];
            }
        })

        const age = getAge(userPreferences.dateOfBirth)
        const bmi = userPreferences.weight / (userPreferences.height ** 2);

        sensitivityScore += age < 8 || age >= 60 ? 2 : 0;
        sensitivityScore += bmi < 18.5 || bmi >= 25 ? 1 : 0;

        return sensitivityScore;
    }

    getCustomMessage(sensitivityScore: number, aqiLevel: string) {
        if (aqiLevel === 'good') {
            if (sensitivityScore >= 0 && sensitivityScore <= 5) {
                return 'Air quality is optimal. No precautions are necessary for you'
                    + 'today.';
            }
            if (sensitivityScore >= 6 && sensitivityScore <= 11) {
                return 'Air quality is good. Enjoy outdoor activities without concern.'
            }
            if (sensitivityScore >= 12 && sensitivityScore <= 14) {
                return 'Good air quality means no precautions are necessary for you'
                    + ' today.'
            }
            if (sensitivityScore >= 15 && sensitivityScore <= 17) {
                return 'Air quality is good, but stay alert for changes.'
            }
            if (sensitivityScore >= 18 && sensitivityScore <= 20) {
                return 'The air is clean, but continue to'
                    + ' monitor AQI for your safety.';
            }
            if (sensitivityScore >= 21 && sensitivityScore <= 22) {
                return 'Air quality is excellent. However, remain vigilant about AQI'
                    + ' changes.'
            }
            if (sensitivityScore >= 23) {
                return 'The air is good today, but stay cautious of changes in AQI.';
            }
        }

        if (aqiLevel === 'moderate') {
            if (sensitivityScore >= 0 && sensitivityScore <= 2) {
                return 'Air quality is acceptable. No specific actions are needed, but'
                    + ' stay informed about AQI changes.'
            }
            if (sensitivityScore >= 3 && sensitivityScore <= 5) {
                return 'Air quality is good for most people, including you. Monitor'
                    + ' AQI for any changes.'
            }
            if (sensitivityScore >= 6 && sensitivityScore <= 8) {
                return 'Air quality is acceptable, but you might experience mild'
                    + ' irritation. Stay alert for changes.'
            }
            if (sensitivityScore >= 9 && sensitivityScore <= 11) {
                return 'Air quality is moderate. If you feel discomfort, reduce outdoor'
                    + ' activities.'
            }
            if (sensitivityScore >= 12 && sensitivityScore <= 14) {
                return 'Air quality is acceptable but could irritate you. Avoid outdoor'
                    + ' exertion if needed.'
            }
            if (sensitivityScore >= 15 && sensitivityScore <= 17) {
                return 'Moderate air quality could cause mild discomfort. Plan'
                    + ' activities to minimize exposure.'
            }
            if (sensitivityScore >= 18 && sensitivityScore <= 20) {
                return 'Moderate air quality might irritate you. Reduce outdoor'
                    + ' exposure if significant discomfort occurs.'
            }
            if (sensitivityScore >= 21 && sensitivityScore <= 22) {
                return 'Even moderate pollution may affect you. Plan to minimize'
                    + ' time outdoors.'
            }
            if (sensitivityScore >= 23 && sensitivityScore <= 24) {
                return 'Moderate air quality can trigger symptoms. Avoid prolonged'
                    + ' outdoor activities.'
            }
            if (sensitivityScore >= 25) {
                return 'Even slight pollution might affect you. Avoid outdoor'
                    + ' activities if symptoms arise.'
            }
        }

        if (aqiLevel === 'unhealthy-sensitive') {
            if (sensitivityScore >= 0 && sensitivityScore <= 2) {
                return 'Air quality is slightly worse, but it’s unlikely to affect you.'
                    + ' Continue your normal activities.'
            }
            if (sensitivityScore >= 3 && sensitivityScore <= 5) {
                return 'Air quality may cause mild discomfort. Consider reducing'
                    + ' prolonged outdoor activities if you notice symptoms.'
            }
            if (sensitivityScore >= 6 && sensitivityScore <= 8) {
                return 'You may feel mild symptoms in this AQI range. Reduce'
                    + ' outdoor exertion if needed.'
            }
            if (sensitivityScore >= 9 && sensitivityScore <= 11) {
                return 'Take precautions outdoors. Consider wearing a mask or'
                    + ' avoiding exertion if symptoms occur. Stay hydrated.'
            }
            if (sensitivityScore >= 12 && sensitivityScore <= 14) {
                return 'Air quality may cause symptoms. Minimize exposure to'
                    + ' outdoor air and consider using a mask.'
            }
            if (sensitivityScore >= 15 && sensitivityScore <= 17) {
                return 'The air is unhealthy for sensitive groups like you. Reduce'
                    + ' outdoor activities if possible.'
            }
            if (sensitivityScore >= 18 && sensitivityScore <= 20) {
                return 'Air quality could trigger symptoms. Limit outdoor activities'
                    + ' and wear protective masks.'
            }
            if (sensitivityScore >= 21 && sensitivityScore <= 22) {
                return 'Take serious precautions. Stay indoors and wear masks if'
                    + ' outdoor exposure is unavoidable.'
            }
            if (sensitivityScore >= 23 && sensitivityScore <= 24) {
                return 'Air quality is risky for you. Take strict precautions and'
                    + ' remain indoors when possible.'
            }
            if (sensitivityScore >= 25) {
                return 'Air quality is unhealthy for you. Remain indoors and ensure'
                    + ' your environment is pollutant-free.'
            }
        }

        if (aqiLevel === 'unhealthy') {
            if (sensitivityScore >= 0 && sensitivityScore <= 2) {
                return 'Air quality is poor, but your minimal sensitivity means you’ll'
                    + ' likely feel no effects. Avoid extreme exertion outdoors.';
            }
            if (sensitivityScore >= 3 && sensitivityScore <= 5) {
                return 'Air quality is unhealthy. Avoid prolonged exertion outdoors,'
                    + ' especially in areas with visible smog and stay hydrated.';
            }
            if (sensitivityScore >= 6 && sensitivityScore <= 8) {
                return 'Air quality is unhealthy for prolonged exposure. Plan activities'
                    + ' to minimize outdoor time, stay hydrated.”';
            }
            if (sensitivityScore >= 9 && sensitivityScore <= 11) {
                return 'Limit outdoor activities. Use protective measures like masks'
                    + ' and keep windows closed.';
            }
            if (sensitivityScore >= 12 && sensitivityScore <= 14) {
                return 'The air is unhealthy. Stay indoors and avoid strenuous'
                    + ' activities outside.”';
            }
            if (sensitivityScore >= 15 && sensitivityScore <= 17) {
                return 'Unhealthy air poses risks. Remain indoors with purified air'
                    + ' whenever possible.';
            }
            if (sensitivityScore >= 18 && sensitivityScore <= 20) {
                return 'Air quality is unsafe for you. Avoid most outdoor exposure'
                    + ' and ensure indoor air quality is clean.”';
            }
            if (sensitivityScore >= 21 && sensitivityScore <= 22) {
                return 'Avoid going outside. Ensure your indoor environment is safe'
                    + ' and pollutant-free.';
            }
            if (sensitivityScore >= 23 && sensitivityScore <= 24) {
                return 'Unhealthy air conditions require you to stay indoors.'
                    + ' Minimize exposure to outdoor air.';
            }
            if (sensitivityScore >= 25) {
                return 'The air is harmful. Stay indoors, and wear masks or'
                    + ' respirators if you must go outside.';
            }
        }

        if (aqiLevel === 'very-unhealthy') {
            if (sensitivityScore >= 0 && sensitivityScore <= 2) {
                return 'Although air quality is very unhealthy, you are unlikely to'
                    + ' experience health effects. Consider limiting prolonged outdoor'
                    + ' activities and stay hydrated.';
            }
            if (sensitivityScore >= 3 && sensitivityScore <= 5) {
                return 'Limit outdoor activities as the air quality could impact your'
                    + ' comfort. Stay indoors if possible.';
            }
            if (sensitivityScore >= 6 && sensitivityScore <= 8) {
                return 'Air quality is very unhealthy. Stay indoors, and use air'
                    + ' purifiers if possible.';
            }
            if (sensitivityScore >= 9 && sensitivityScore <= 11) {
                return 'Prolonged exposure could lead to noticeable effects. Stay'
                    + ' indoors as much as possible.”';
            }
            if (sensitivityScore >= 12 && sensitivityScore <= 14) {
                return 'Air quality is very unhealthy. Remain indoors, and ensure'
                    + ' your environment is safe.';
            }
            if (sensitivityScore >= 15 && sensitivityScore <= 17) {
                return 'Very unhealthy conditions require strict precautions. Avoid'
                    + ' outdoor exposure entirely.';
            }
            if (sensitivityScore >= 18 && sensitivityScore <= 20) {
                return 'Stay indoors and use air purifiers. Avoid outdoor activities.';
            }
            if (sensitivityScore >= 21 && sensitivityScore <= 22) {
                return 'Conditions are dangerous for your health. Remain indoors'
                    + ' and use air filtration systems.';
            }
            if (sensitivityScore >= 23 && sensitivityScore <= 24) {
                return 'Air quality is very unhealthy. Stay indoors and use air'
                    + ' filtration. Seek medical help for worsening symptoms.';
            }
            if (sensitivityScore >= 25) {
                return 'Very unhealthy conditions pose severe risks. Remain'
                    + ' indoors and consult your doctor.';
            }
        }

        if (aqiLevel === 'hazardous') {
            if (sensitivityScore >= 0 && sensitivityScore <= 2) {
                return 'Even in hazardous air conditions, your sensitivity level'
                    + ' suggests minimal impact, but caution is still recommended as'
                    + ' well as to stay hydrated.';
            }
            if (sensitivityScore >= 3 && sensitivityScore <= 5) {
                return 'Avoid outdoor exposure during hazardous conditions, as'
                    + ' even individuals with low sensitivity may experience'
                    + ' symptoms.';
            }
            if (sensitivityScore >= 6 && sensitivityScore <= 8) {
                return 'Hazardous conditions can seriously impact your health.'
                    + ' Avoid outdoor exposure entirely. If you must go out, protect'
                    + ' yourself with a face mask.';
            }
            if (sensitivityScore >= 9 && sensitivityScore <= 11) {
                return 'Avoid outdoor exposure completely. Ensure indoor air quality'
                    + ' is clean and safe. Utilise air purifiers and stay hydrated.';
            }
            if (sensitivityScore >= 12 && sensitivityScore <= 14) {
                return 'Hazardous conditions pose significant risks. Avoid outdoor'
                    + ' activities and seek medical advice if symptoms worsen.';
            }
            if (sensitivityScore >= 15 && sensitivityScore <= 17) {
                return 'Hazardous air quality is a severe risk. Stay indoors and'
                    + ' ensure proper air filtration.';
            }
            if (sensitivityScore >= 18 && sensitivityScore <= 20) {
                return 'Air quality is hazardous. Seek medical advice if symptoms'
                    + ' worsen. Avoid all exposure.';
            }
            if (sensitivityScore >= 21 && sensitivityScore <= 22) {
                return 'Air quality is extremely hazardous. Stay indoors and seek'
                    + ' medical advice for any symptoms.';
            }
            if (sensitivityScore >= 23 && sensitivityScore <= 24) {
                return 'Hazardous air is life-threatening. Avoid all outdoor exposure'
                    + ' and follow your healthcare provider’s advice.';
            }
            if (sensitivityScore >= 25) {
                return 'Hazardous air quality requires emergency precautions.'
                    + ' Avoid all exposure and seek immediate medical care if'
                    + ' necessary.';
            }
        }


    }

    async getCustomAirQuality(airQuality: AirQuality, latitude: string, longitude: string) {
        const globalIndex = await airQuality.getAirQuality(latitude, longitude);
        const aqiLevel = calculateAQILevel(globalIndex);
        const sensitivityScore = await this.calculateSensitivityScore();
        const customMessage = this.getCustomMessage(sensitivityScore, aqiLevel);
        return {
            globalIndex,
            customMessage
        }
    }
}