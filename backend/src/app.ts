import express, { Express } from 'express';
import { airQualityRouter } from './routes/air-quality.router';
import { userRouter } from './routes/user.router';
import { mapsRouter } from './routes/maps.router';
import { apiErrorHandler } from './middlewares/api-error-handler.middleware';
import { notificationsRouter } from './routes/notifications.router';
import { CronJob } from 'cron';
import { NotificationsService } from './services/Notifications.service';
import { Database } from './configs/Database';
import { AirQuality } from './services/AirQuality.service';
import { axiosAirQuality } from './configs/axiosAirQuality';

const port = 8000;

const app: Express = express();
app.set('trust proxy', true)

// Middlewares
app.use(express.json());

// Routes
app.use('/air-quality', airQualityRouter);
app.use('/users', userRouter);
app.use('/maps', mapsRouter);
app.use('/notifications', notificationsRouter);

const notificationService = new NotificationsService(new Database());

const airQuality = new AirQuality(axiosAirQuality);

const job = new CronJob(
	'*/1 * * * *', // cronTime
	() => notificationService.notificate(airQuality), // onTick
	null, // onComplete
	true, // start
	'America/Los_Angeles' // timeZone
);


app.use(apiErrorHandler);

app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
})