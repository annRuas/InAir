import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

export class Database {
    
    async createDoc(collection: string, docName: string, content: object) {
        await setDoc(doc(firestore, collection, docName), content);
    }

    async getDoc(collection: string, docName: string) {
        const docSnap = await getDoc(doc(firestore, collection, docName));
        if(docSnap.exists()) {
            return docSnap.data();
        }
    }

    async updateDoc(collection: string, docName: string, content: object) {
        await updateDoc(doc(firestore, collection, docName), content);
    }
}