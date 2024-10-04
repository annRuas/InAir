import express, { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRouter: Router = express.Router();


userRouter.post('/create-preferences', userController.createPreferences);

userRouter.post('/getPreferences', userController.getPreferences);

export { userRouter }
