import express, { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRouter: Router = express.Router();


userRouter.post('/create-preferences', userController.createUserPreferences);

userRouter.post('/getPreferences', userController.getPreferences);

userRouter.post('/add-location', userController.addLocation);

export { userRouter }
