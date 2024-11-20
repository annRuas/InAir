import { Request, Response } from "express";
import { axiosMap } from "../configs/axiosMap";
import { MapService } from "../services/Map.service";

async function getLocations(req: Request, res: Response) {
    const { address_name } = req.body;

    const mapService = new MapService(axiosMap);

    const locations = await mapService.getLocations(address_name);

    res.send({addresses: locations});
}

export { getLocations }