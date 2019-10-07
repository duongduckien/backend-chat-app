import User from '../src/api/user/user.model';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [
    User,
  ],
  // migrations: [
  //   __dirname + 'src/database/migrations/**/*.ts',
  // ],
  synchronize: true,
  logging: true,
};

export default config;
