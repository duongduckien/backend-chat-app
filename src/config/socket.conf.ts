import express from 'express';
import { createServer, Server } from 'http';
import socketIo from 'socket.io';

export class SocketConfig {
    public static init(application: express.Application): Server {
        try {
            const server = createServer(application);
            this.socketServer = socketIo.listen(server);
            return server;
        } catch (error) {
            throw error;
        }
    }

    public static get Instance(): SocketIO.Server {
        try {
            return this.socketServer;
        } catch (error) {
            throw error;
        }
    }

    private static socketServer: SocketIO.Server = null;
}
