import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';

export class DBConfig {
    public static async init(config: ConnectionOptions): Promise<void> {
        try {
            this.connection = await createConnection(config);
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
