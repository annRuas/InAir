import { Request, Response } from "express";
import { UserPreferences } from "../interfaces/user-preferences.interface";
import { firestore } from "../configs/firebaseConfig";
import { addDoc, collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore";
import { UserService } from "../services/User.service";
import { Database } from "../configs/Database";

export async function createUserPreferences(req: Request, res: Response) {
    const {uid, name, email} = req.body;

    const userService = new UserService(new Database(), uid);

    await userService.createPreferences(name, email);

    res.status(200).send({'message': 'User created.'});
}

export async function addLocation(req: Request, res: Response) {
    const { locationName, latitude, longitude, uid } = req.body;

    const usersCollection = collection(firestore, 'users-data');
    const q = query(usersCollection, where('uid', '==', uid));

    
    const document = await getDocs(q);

    const docId = document.docs[0].id;
    const docContent = document.docs[0].data();

    const docReference = doc(firestore, 'users-data', docId)

    const newSingleLocation = {
        locationName,
        latitude,
        longitude
    }
    
    const newLocations = docContent.locations ? docContent.locations.concat([newSingleLocation]) : [newSingleLocation];
    console.log(docContent.locations);
    console.log(newLocations)
    await updateDoc(docReference, {
        locations: newLocations
    });

    return res.send();
}




export async function getPreferences(req: Request, res: Response) {
    const { uid } = req.body;

    const usersCollection = collection(firestore, 'users-data');
    const q = query(usersCollection, where('uid', '==', uid));

    
    const doc = await getDocs(q);


    return res.send(doc.docs[0].data());
}