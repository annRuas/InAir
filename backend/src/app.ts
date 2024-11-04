import express, { Express } from 'express';
import { airQualityRouter } from './routes/air-quality.router';
import { userRouter } from './routes/user.router';
import { mapsRouter } from './routes/maps.router';
import { apiErrorHandler } from './middlewares/api-error-handler.middleware';

const port = 8000;

const app: Express = express();
app.set('trust proxy', true)

// Middlewares
app.use(express.json());

// Routes
app.use('/air-quality', airQualityRouter);
app.use('/users', userRouter);
app.use('/maps', mapsRouter);

app.use(apiErrorHandler);

app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
})