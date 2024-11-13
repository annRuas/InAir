import express, { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validateRequestBody, validateRequestHeader } from '../middlewares/validate-request.middleware';
import { userDataSchema } from '../schemas/user-data.schema';
import { userHeaderSchema } from '../schemas/user.schema';
import { userPreferencesSchema } from '../schemas/user-preferences.schema';

const userRouter: Router = express.Router();

userRouter.use(validateRequestHeader(userHeaderSchema));

userRouter.post('/data', validateRequestBody(userDataSchema), userController.createUsersData);

userRouter.post('/preferences', validateRequestBody(userPreferencesSchema), userController.createUserPreferences);

userRouter.get('/information', userController.getUserInformation);

userRouter.get('/data', userController.getUserData);

userRouter.get('/locations', userController.getUserLocations);

userRouter.post('/location', userController.addLocation);

export { userRouter }
