import { NextFunction, Request, Response } from "express";
import { firestore } from "../configs/firebaseConfig";
import { collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore";
import { UserService } from "../services/User.service";
import { Database } from "../configs/Database";
import { UserData } from "../schemas/user-data.schema";
import { UserPreferences } from "../schemas/user-preferences.schema";

export async function createUsersData(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email }: UserData = req.body;
        const uid = req.headers.uid as string;

        const userService = new UserService(new Database(), uid);

        await userService.createData({ name, email });

        res.status(200).send({ 'message': 'User created.' });
    } catch (error) {
        next(error);
    }
}

export async function createUserPreferences(req: Request, res: Response, next: NextFunction) {
    try {
        const userPreferences: UserPreferences = req.body;
        const uid = req.headers.uid as string;

        const userService = new UserService(new Database(), uid);

        await userService.createPreferences(userPreferences);

        res.status(200).send({ 'message': 'Preferences created.' });
    } catch(error) {
        next(error); 
    }
}

export async function addLocation(req: Request, res: Response) {
    const { location } = req.body;
    const uid = req.headers.uid as string;

    const userService = new UserService(new Database(), uid);

    await userService.addLocation(location);

    return res.status(200).send({ 'message': 'Location added.' });
}

export async function getUserInformation(req: Request, res: Response, next: NextFunction) {
    try {
        const uid = req.headers.uid as string;

        const userService = new UserService(new Database(), uid);
        const userInformation = await userService.getUserInformation();

        res.status(200).send(userInformation);
    } catch (error) {
        next(error);
    }
}

export async function getUserLocations(req: Request, res: Response, next: NextFunction) {
    try {
        const uid = req.headers.uid as string;

        const userService = new UserService(new Database(), uid);
        const userLocations = await userService.getUserLocations();

        res.status(200).send(userLocations);
    } catch (error) {
        next(error);
    }
}


export async function getUserData(req: Request, res: Response) {
    const uid = req.headers.uid as string;

    const userService = new UserService(new Database(), uid);

    const userData = await userService.getUserData();

    res.status(200).send(userData);
}