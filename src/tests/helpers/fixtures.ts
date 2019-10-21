import * as faker from 'faker';
import { Connection } from 'typeorm';
const generateFakeUser = (name: string): any => {
    return {
        name: name || faker.name.firstName
    };
};

export const createUser = (
    name: string,
    entityName: string,
    connection: Connection
): any => {
    const data = Object.assign({}, generateFakeUser(name));
    const repository = connection.getRepository(entityName);
    return repository
        .createQueryBuilder(entityName)
        .insert()
        .values(data)
        .execute();
};
