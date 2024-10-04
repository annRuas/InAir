import express, { Router } from 'express';
import * as airQualityController from '../controllers/air-quality.controller';

const airQualityRouter: Router = express.Router();


airQualityRouter.post('/', airQualityController.airQuality);

airQualityRouter.post('/custom', airQualityController.airQualityCustom);

export { airQualityRouter }
