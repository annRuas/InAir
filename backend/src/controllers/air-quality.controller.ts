import { Request, Response } from "express";
import { AirQuality } from "../services/AirQuality.service";
import { axiosAirQuality } from "../configs/axiosAirQuality";
import { UserService } from "../services/User.service";
import { Database } from "../configs/Database";

async function airQuality(req: Request, res: Response) {
    const { latitude, longitude } = req.body;
    
    const airQuality = new AirQuality(axiosAirQuality);

    const globalIndex = await airQuality.getAirQuality(latitude, longitude);

    return res.status(200).send({globalIndex: globalIndex});
}

async function airQualityCustom(req: Request, res: Response) {
    const { latitude, longitude, uid } = req.body;
    
    const airQuality = new AirQuality(axiosAirQuality);
    const userService = new UserService(new Database(), uid);

    const globalIndex = await userService.getCustomAirQuality(airQuality, latitude, longitude);

    return res.status(200).send({globalIndex: globalIndex});
}


export { airQuality, airQualityCustom }