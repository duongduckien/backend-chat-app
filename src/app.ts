import express from 'express';
import { Config } from './config/index';
import { env } from './env';
const app = express();
const PORT = env.app.port || 3000;

try {
    const server = Config.init(app, express.Router());
    server.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
} catch (error) {
    console.log(error);
}
