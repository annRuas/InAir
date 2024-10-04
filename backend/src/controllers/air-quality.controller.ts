import { Request, Response } from "express";
import axios, { AxiosResponse } from 'axios';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const { ATLAS_AIR_QUALITY_LINK, SUBSCRIPTION_KEY } = process.env;

async function airQuality(req: Request, res: Response) {
    const { latitude, longitude } = req.body;
    
    const link = `${ATLAS_AIR_QUALITY_LINK}/current/json?api-version=1.1&query=${latitude}, ${longitude}&subscription-key=${SUBSCRIPTION_KEY}`;

    const response: AxiosResponse = await axios.get(link);

    res.send({globalIndex: response.data.results[0].globalIndex});
}

async function airQualityCustom(req: Request, res: Response) {
    const { latitude, longitude, uid } = req.body;
    
    const link = `${ATLAS_AIR_QUALITY_LINK}/current/json?api-version=1.1&query=${latitude}, ${longitude}&subscription-key=${SUBSCRIPTION_KEY}`;

    const response: AxiosResponse = await axios.get(link);

    // const globalIndex: number = response.data.results[0].globalIndex;
    const globalIndex: number = 150;

    const usersCollection = collection(firestore, 'users-data');
    const q = query(usersCollection, where('uid', '==', uid));
    
    const doc = await getDocs(q);

    const userInfo: any = doc.docs[0].data();
    console.log(userInfo);
    console.log('ok');
    if((userInfo.age < 18 || userInfo.age > 60 || userInfo.hasAsthma || userInfo.hasCOPD || userInfo.hasBronchitis) && globalIndex > 100) {
        return res.send({globalIndex: globalIndex, message: 'Due to your conditions, there is great risks in going out today. You should avoid high trafic roads.'});
    } else {
        return res.send({globalIndex: globalIndex, message: `The current air quality shouldn't have an worsening effect in your health.`});
    }
}


export { airQuality, airQualityCustom }