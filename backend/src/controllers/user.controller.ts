import { Request, Response } from "express";
import { UserPreferences } from "../interfaces/user-preferences.interface";
import { firestore } from "../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

async function createPreferences(req: Request, res: Response) {
    const userPreferences: UserPreferences = req.body;

    const usersCollection = collection(firestore, 'users-data');

    await addDoc(usersCollection, userPreferences);

    res.send({'message': 'ok'});
}




async function getPreferences(req: Request, res: Response) {
    const { uid } = req.body;

    const usersCollection = collection(firestore, 'users-data');
    const q = query(usersCollection, where('uid', '==', uid));

    
    const doc = await getDocs(q);


    return res.send(doc.docs[0].data());
}



export { createPreferences, getPreferences }