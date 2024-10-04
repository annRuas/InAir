import { Request, Response } from "express";
import { UserPreferences } from "../interfaces/user-preferences.interface";
import { firestore } from "../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

async function createPreferences(req: Request, res: Response) {
    const userPreferences: UserPreferences = req.body;

    console.log(userPreferences);

    const usersCollection = collection(firestore, 'users-data');

    await addDoc(usersCollection, userPreferences);

    res.send({'message': 'ok'});
}


async function hasPreferences(req: Request, res: Response) {
    const { uid } = req.body;

    const usersCollection = collection(firestore, 'users-data');
    const q = query(usersCollection, where('uid', '==', uid));

    
    const doc = await getDocs(q);

    if(doc.docs.length === 0) {
        return res.send({message: 'not found'});
    }

    return res.send({message: 'found'});

}



export { createPreferences, hasPreferences }