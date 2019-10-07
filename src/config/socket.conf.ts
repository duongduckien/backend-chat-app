import express from 'express';
import { createServer, Server } from 'http';
import socketIo from 'socket.io';

export class SocketConfig {
  public static init(application: express.Application): void {
    const server: Server = createServer(application);
    socketIo(server);
  }
}
