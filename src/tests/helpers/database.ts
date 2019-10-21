import { Connection } from 'typeorm';

export const migrateDatabase = async (connection: Connection) => {
  await connection.dropDatabase();
  return connection.runMigrations();
};

export const getEntities = (connection: Connection): any[] => {
  const entities: any[] = [];
  (connection.entityMetadatas).forEach(
    (x: { name: any; tableName: any; }) => entities.push({name: x.name, tableName: x.tableName}),
  );
  return entities;
};

export const cleanAllTable = async (connection: Connection, entities: any[]): Promise<void> => {
  let repository = null;
  try {
    for (const entity of entities) {
      repository = connection.getRepository(entity.name);
      await repository.query('SET FOREIGN_KEY_CHECKS=0;');
      await repository.query('SET FOREIGN_KEY_CHECKS=0;');
      await repository.query(`TRUNCATE TABLE \`${entity.tableName}\`;`);
      await repository.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
};

export const getRepository = (tableName: string, connection: Connection): any => {
  try {
    return connection.getRepository(tableName);
  } catch (error) {
    throw new Error(`ERROR: get Repository: ${error}`);
  }
};

export const closeDbConnection = async (connection: Connection) => {
  try {
    if (connection && connection.isConnected) {
      await connection.close();
    }
  } catch (error) {
    console.log(error);
  }
};
