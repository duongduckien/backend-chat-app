import * as faker from 'faker';
import { Connection } from 'typeorm';
const generateFakeUser = (name: string): any => {
    return {
        name: name || faker.name.firstName
    };
};

const generateFakeConversation = (title: string): any => {
    return {
        title: title || faker.random.word
    };
};

export const createUser = (
    name: string,
    connection: Connection
): any => {
    const data = Object.assign({}, generateFakeUser(name));
    const repository = connection.getRepository('users');
    return repository
        .createQueryBuilder('users')
        .insert()
        .values(data)
        .execute();
};

export const createConversation = (
    title: string,
    connection: Connection
): any => {
    const data = Object.assign({}, generateFakeConversation(title));
    const repository = connection.getRepository('conversation');
    return repository
        .createQueryBuilder('conversation')
        .insert()
        .values(data)
        .execute();
};
