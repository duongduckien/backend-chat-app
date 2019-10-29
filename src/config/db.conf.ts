import 'reflect-metadata';
import { env } from '../env';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';

export class DBConfig {
    public static async init(config: ConnectionOptions): Promise<void> {
        try {
            const dbConfig: any = {
                ...config,
            };

            if (env.isProduction) {
                dbConfig.url = process.env.CLEARDB_DATABASE_URL;
            }

            this.connection = await createConnection(dbConfig);
        } catch (error) {
            console.log('Error while connecting to the database', error);
            throw error;
        }
    }

    static get Instance(): Connection {
        try {
            return this.connection;
        } catch (error) {
            throw error;
        }
    }

    private static connection: Connection = null;
}
