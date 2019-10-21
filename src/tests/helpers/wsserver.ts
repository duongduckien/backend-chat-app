import express from 'express';
// import { env } from '../../env';
import { SocketConfig } from '../../../src/config/socket.conf';

export const initSocketServer = () => {
    const app = express();
    SocketConfig.init(app);
    // app.listen(env.app.port, () => {
    //   console.log(`Server running on ${env.app.port}`);
    // });
};
