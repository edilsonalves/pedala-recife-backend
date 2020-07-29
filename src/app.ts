import express from 'express';
import cors from 'cors';
import roadRouter from './routes/road.router';

const app = express();

app.use(express.json());
app.use(cors());
app.use(roadRouter);

export default app;
