import 'dotenv/config';
import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';

export class DBConfig {

  public static async init(config: ConnectionOptions): Promise<void> {
    try {
      await createConnection(config);
    } catch (error) {
      console.log('Error while connecting to the database', error);
      throw error;
    }
  }
}
