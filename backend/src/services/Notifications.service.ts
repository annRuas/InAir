import axios from "axios";
import { Database } from "../configs/Database";
import { ApiError } from "../utils/ApiError";
import { AirQuality } from "./AirQuality.service";
import { calculateAQILevel } from "../utils/utis";

export class NotificationsService {

    database: Database;
    notificationsCollection = 'notifications';
    usersLocationsCollection = 'users-locations';

    constructor(database: Database) {
        this.database = database;
    }

    async addToNotificationList(uid: string, token: string) {
        const notificationList = await this.database.getDoc(this.notificationsCollection, 'notificationList') as { notifications: object[] };
        const newNotification = {
            uid,
            token,
            lastNotificationSended: '',
            aqiLevel: ''
        }

        if (notificationList === undefined) {
            throw ApiError.notFound('Document notification list');
        }

        /** @todo fix logic to avoid duplicates */
        if (!notificationList.notifications.includes(newNotification)) {
            notificationList.notifications.push(newNotification);
            await this.database.updateDoc(this.notificationsCollection, 'notificationList', notificationList);
        }
    }

    async removeFromNotificationList(uid: string) {
        const notificationList = await this.database.getDoc(this.notificationsCollection, 'notificationList') as { notifications: any[] };
        
        const newNotificationList = notificationList.notifications.filter(e => e.uid !== uid)

        notificationList.notifications = newNotificationList
        await this.database.updateDoc(this.notificationsCollection, 'notificationList', notificationList);
    }
    async notificate(airQuality: AirQuality) {
        const HOUR = 1000 * 60 * 60;
        const anHourAgo = Date.now() - HOUR;
        const messages: { to: any; body: string; }[] = [];
        const notificationList = await this.database.getDoc(this.notificationsCollection, 'notificationList') as { notifications: any[] };
        for(const notification of notificationList.notifications) {
            if(notification.lastNotificationSended > anHourAgo && notification.lastNotificationSended !== '') {
                continue;
            }

            const locations = await this.database.getDoc(this.usersLocationsCollection, notification.uid);

            if(locations === undefined || locations.locations.length === 0) {
                console.log('no locations');
                continue
            }

            const { coordinates } = locations.locations[0];

            const aqiNumber = await airQuality.getAirQuality(coordinates.latitude, coordinates.longitude);
            const aqiStatus = calculateAQILevel(aqiNumber); 

            if(aqiStatus === notification.aqiLevel) {
                continue;
            }

            notification.lastNotificationSended = Date.now();
            const message = notification.aqiLevel === '' ? `AQI level is ${aqiStatus}` : `AQI level changed from ${notification.aqiLevel} to ${aqiStatus}`;
            notification.aqiLevel = aqiStatus;
            messages.push({
                to: notification.token,
                body: message 
            });

        }

        for (let message of messages) {
            try {
                await axios.post('https://exp.host/--/api/v2/push/send', message, {

                    headers: {
                        Accept: 'application/json',
                        'Accept-encoding': 'gzip, deflate',
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                console.error(error);
            }
        }

        await this.database.updateDoc(this.notificationsCollection, 'notificationList', notificationList);
    }


}