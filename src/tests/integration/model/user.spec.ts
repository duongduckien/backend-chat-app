import { expect } from '../../helpers/chai';
import {
    getRepository,
    closeDbConnection,
    migrateDatabase
} from '../../helpers/database';
import { createUser } from '../../helpers/fixtures';
import { DBConfig } from '../../../config/db.conf';
import config from '../../../../ormconfig';
import { Connection } from 'typeorm';

describe('User instance', () => {
    let connection: Connection = null;
    before('before', async () => {
        await DBConfig.init(config);
        connection = DBConfig.Instance;
        await migrateDatabase(connection);
    });

    after('after', async () => {
        await closeDbConnection(connection);
    });

    it('finds user by id', async () => {
        await createUser('test', connection);
        const userRepository = getRepository('users', connection);
        const user = await userRepository.findByIds(1);
        expect(user).to.not.be.null;
    });

    it('finds non existent user by id', async () => {
        const userRepository = getRepository('users', connection);
        const invalidId = 100000;
        const user = await userRepository.findByIds(invalidId);
        expect(user).to.be.length(0);
    });
});
