import express from 'express';
import { Config } from './config/index';

const app = express();
const PORT = process.env.PORT || 3000;

try {
  Config.init(app, express.Router());
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
