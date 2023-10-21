import express, { Application, json } from 'express';
import { DBconnection } from './db/connection';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/index.routes';
import validateToken from './helpers/validate-token';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use('/api', validateToken, router);
app.listen(port, async () => {
    await DBconnection();
    console.log(`Listening on port ${port}`);
});
