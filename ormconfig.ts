import User from './src/api/user/user.model';
import Conversation from './src/api/conversation/conversation.model';
import Conversationtouser from './src/api/conversationtouser/conversationToUser.model';
import Message from './src/api/message/message.model';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Conversation, Conversationtouser, Message],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false,
  logging: true,
  cli: {
    migrationsDir: 'src/migrations/',
  },
};

export = config;
