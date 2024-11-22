import express, { Router } from 'express';
import * as notificationController from '../controllers/notifications.controller';

const notificationsRouter : Router = express.Router();

notificationsRouter.post('/add', notificationController.addToNotificationList);
notificationsRouter.post('/remove', notificationController.removeFromNotificationList);

export { notificationsRouter }
