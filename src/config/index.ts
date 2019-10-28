import express from 'express';
import { ApplicationConfig } from './app.conf';
import { DBConfig } from './db.conf';
import { Routes } from './routes.conf';
import config from '../../ormconfig';
import { errorHandler } from '../errors/ErrorHandler';
import { SocketConfig } from './socket.conf';
import { Server } from 'http';

export class Config {
    public static init(app: express.Application, router: express.Router): Server {
        try {
            ApplicationConfig.init(app);
            Routes.init(app, router);
            DBConfig.init(config);
            const server = SocketConfig.init(app);
            app.use(errorHandler);
            return server;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
