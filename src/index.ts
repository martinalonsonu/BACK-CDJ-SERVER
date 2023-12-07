import express, { Application, json } from 'express';
import { DBconnection } from './db/connection';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import IndexRouter from './routes/index.routes';

dotenv.config();

class Server {
    private app: Application;
    private port: number | string;
    private routeClient: string | undefined;

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8000;
        this.routeClient = process.env.ROUTE_CLIENT || undefined

        this.config();
        this.routes();
        this.listen();
    }

    private config = (): void => {
        this.app.use(morgan('dev'));
        this.app.use(cors({
            origin: this.routeClient,
            credentials: true
        }));
        this.app.use(json());
    }

    private routes = (): void => {
        const { router } = new IndexRouter();
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