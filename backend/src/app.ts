import express, { Express } from 'express';
import { airQualityRouter } from './routes/air-quality.router';
import { userRouter } from './routes/user.router';
import { mapsRouter } from './routes/maps.router';

const port = 8000;

const app: Express = express();
app.set('trust proxy', true)

// Middlewares
app.use(express.json());

// Routes
app.use('/air-quality', airQualityRouter);
app.use('/users', userRouter);
app.use('/maps', mapsRouter);

app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
})