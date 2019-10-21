import * as dotenv from 'dotenv';
import * as path from 'path';
/**
 * Load .env file or for tests the .env.test file.
 */
// tslint:disable-next-line: max-line-length
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '.development')}`) });
/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
      port: Number(process.env['PORT']),
  },
  db: {
    type: process.env['TYPE'],
    host: process.env['MYSQL_HOST'],
    port: process.env['MYSQL_PORT'],
    username: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASSWORD'],
    database: process.env['MYSQL_DATABASE'],
    synchronize: process.env['TYPEORM_SYNCHRONIZE'],
    logging: process.env['TYPEORM_LOGGING'],
    migration: process.env['TYPEORM_MIGRATIONS'],
    migrationDir: process.env['TYPEORM_MIGRATIONS_DIR'],
  },
};
