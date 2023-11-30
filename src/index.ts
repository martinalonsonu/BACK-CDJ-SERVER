import express, { Application, json } from 'express';
import { DBconnection } from './db/connection';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/index.routes';

dotenv.config();

class Server {
    private app: Application;
    private port: number | string;

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8000;

        this.config();
        this.routes();
        this.listen();
    }

    private config = (): void => {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(json());
    }

    private routes = (): void => {
        this.app.use('/api', router);
    }

    private listen = (): void => {
        this.app.listen(this.port, async () => {
            await DBconnection();
            console.log(`Listening on port ${this.port}`);
        });
    }
}

new Server();