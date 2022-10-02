import { Route } from '@core/interfaces';
import express from 'express';
import http from 'http';


class App {
    public port: string | number;
    public app: express.Application;
    public server: http.Server;

    constructor(routes: Route[]) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || 15000;
        

        this.initializeRoutes(routes);
    }

    public listen() {
        this.server.listen(this.port, () => {
            //Logger.info(`Server is listening on port ${this.port}`);
            console.log(`Server is listening on port ${this.port}`);
        });
    }
    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
}

export default App;