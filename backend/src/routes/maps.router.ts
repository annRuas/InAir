import express, { Router } from 'express';
import * as mapsController from '../controllers/maps.controller';

const mapsRouter: Router = express.Router();

mapsRouter.post('/get-locations', mapsController.getLocations);

export { mapsRouter }
