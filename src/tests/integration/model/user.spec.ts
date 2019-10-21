import { expect } from '../../helpers/chai';
import {
    cleanAllTable,
    getEntities,
    getRepository,
    closeDbConnection
} from '../../helpers/database';
import { createUser } from '../../helpers/fixtures';
import { DBConfig } from '../../../config/db.conf';
import config from '../../../../ormconfig';

describe('User instance', () => {
    let userRepository: any = null;

    before('before', async () => {
        await closeDbConnection(DBConfig.Instance);
        await DBConfig.init(config);
        userRepository = getRepository('users', DBConfig.Instance);
    });

    beforeEach('fixtures', async () => {
        await cleanAllTable(DBConfig.Instance, getEntities(DBConfig.Instance));
        createUser('test', 'users', DBConfig.Instance);
    });

    it('finds user by id', async () => {
        const user = await userRepository.findByIds(1);
        expect(user).to.not.be.null;
    });

    it('finds non existent user by id', async () => {
        const invalidId = 100000;
        const user = await userRepository.findByIds(invalidId);
        expect(user).to.be.length(0);
    });
});
