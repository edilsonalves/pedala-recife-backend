import express from 'express';
import cors from 'cors';
import path from 'path';
import roadRouter from './routes/road.router';

const app = express();

app.use(express.json());
app.use(cors());
app.use(roadRouter);
app.use(express.static(path.join(__dirname, '../', 'public')));

export default app;
