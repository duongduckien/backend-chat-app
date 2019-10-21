import express from 'express';
import { createServer, Server } from 'http';
import socketIo from 'socket.io';

export class SocketConfig {
    public static init(application: express.Application): void {
        try {
            const server: Server = createServer(application);
            this.socketServer = socketIo(server);
            this.socketServer.listen(3003);
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
