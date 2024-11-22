import { Request, Response } from "express";
import { axiosMap } from "../configs/axiosMap";
import { NotificationsService } from "../services/Notifications.service";
import { Database } from "../configs/Database";

async function addToNotificationList(req: Request, res: Response) {
    const { token } = req.body;

    const uid = req.headers.uid as string;

    const notificationService = new NotificationsService(new Database());

    await notificationService.addToNotificationList(uid, token);

    res.status(200).send({statusMessage: 'Ok'});
}

async function removeFromNotificationList(req: Request, res: Response) {
    const uid = req.headers.uid as string;

    const notificationService = new NotificationsService(new Database());

    await notificationService.removeFromNotificationList(uid);

    res.status(200).send({statusMessage: 'Ok'});
}

export { addToNotificationList, removeFromNotificationList }