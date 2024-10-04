import express, { Express, NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import inairCredentials from '../inair.json';

// Routes
import { airQualityRouter } from './routes/air-quality.router';
import { userRouter } from './routes/user.router';
import { mapsRouter } from './routes/maps.router';
const credentials: any = inairCredentials;

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const port = 8000;

const app: Express = express();
app.set('trust proxy', true)

app.use(express.json());

// app.use(async function(req: Request, res: Response, next: NextFunction) {
//     const { authorization } = req.headers;
//     console.log(authorization);
//     try {
//         await admin.auth().verifyIdToken(authorization ?? 'test');
//         console.log('auth done');
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).send({message: 'error'});
//     }
    

// })
app.use('/air-quality', airQualityRouter);
app.use('/users', userRouter);
app.use('/maps', mapsRouter);

app.listen(port, () => {
    console.log('worked');
})