import { Route } from '@core/interfaces';
import { Logger } from './core/utils';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';


class App {
    public port: string | number;
    public app: express.Application;
    public production: boolean;
    public server: http.Server;

    constructor(routes: Route[]) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || 15000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;


        this.connectToDatabase();
        this.initializeRoutes(routes);
        this.initializeMiddleware();
    }

    public listen() {
        this.server.listen(this.port, () => {
            Logger.info(`Server is listening on port ${this.port}`);
        });
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }

    private initializeMiddleware() {
        if (this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
        } else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private connectToDatabase() {
        const connectString = process.env.MONGODB_URI;
        if (!connectString) {
            Logger.error('Connection string is invalid');
            return;
        }
        mongoose
            .connect(connectString, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                // useFindAndModify: false,
                // useCreateIndex: true,
            })
            .catch((reason) => {
                console.log(reason);
                // Logger.error(reason);
            });
        Logger.info('Database connected...');
    }
}

export default App;