import { Route } from '@core/interfaces';
import { Logger } from '@core/utils';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import { errorMiddleware } from '@core/middleware';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

class App {
    public port: string | number;
    public app: express.Application;
    public production: boolean;
    public server: http.Server;

    constructor(routes: Route[]) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;

        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorMiddleware();
        this.initializeSwagger();

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

    private initializeErrorMiddleware() {
        this.app.use(errorMiddleware);
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
                Logger.error(reason);
            });
        Logger.info('Database connected...');
    }

    private initializeSwagger() {
        const swaggerDocument = YAML.load('./src/swagger.yaml');

        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}

export default App;