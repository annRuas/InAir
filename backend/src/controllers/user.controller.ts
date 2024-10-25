import { Request, Response } from "express";
import { UserPreferences } from "../interfaces/user-preferences.interface";
import { firestore } from "../firebaseConfig";
import { addDoc, collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore";

async function createPreferences(req: Request, res: Response) {
    const userPreferences: UserPreferences = req.body;

    const usersCollection = collection(firestore, 'users-data');

    await addDoc(usersCollection, userPreferences);

    res.send({'message': 'ok'});
}

async function addLocation(req: Request, res: Response) {
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




async function getPreferences(req: Request, res: Response) {
    const { uid } = req.body;

    const usersCollection = collection(firestore, 'users-data');
    const q = query(usersCollection, where('uid', '==', uid));

    
    const doc = await getDocs(q);


    return res.send(doc.docs[0].data());
}



export { createPreferences, getPreferences, addLocation }