import User from './src/api/user/user.model';
import Conversation from './src/api/conversation/conversation.model';
import Conversationtouser from './src/api/conversationtouser/conversationToUser.model';
import Message from './src/api/message/message.model';
import { ConnectionOptions } from 'typeorm';
import { env } from './src/env';

const config: ConnectionOptions = {
  type: env.db.type as any,
  host: env.db.host,
  port: Number(env.db.port),
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  entities: [User, Conversation, Conversationtouser, Message],
  migrations: [env.db.migration],
  synchronize: env.db.synchronize === 'true',
  logging: env.db.logging === 'true',
  cli: {
    migrationsDir: env.db.migrationDir,
  },
};

export = config;
