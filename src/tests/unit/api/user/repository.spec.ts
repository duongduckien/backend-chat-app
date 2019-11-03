import { expect, sinon } from '../../../helpers/chai';
import { UserRepository } from '../../../../api/user/user.repository';
import User from '../../../../api/user/user.model';
import 'mocha';

describe('User repository', () => {
    it('Find or create with existed User', async () => {
        const name = 'test';
        const user: User = {
            name: 'test',
            socket_id: undefined,
            updated_at: undefined,
            created_at: undefined,
            is_deleted: undefined
        };

        const userRepository = new UserRepository();

        sinon.stub(userRepository, 'findOne').resolves(user);
        sinon.stub(userRepository, 'save').resolves(null);

        const result = await userRepository.findOrCreate(name);

        expect(result.name).to.be.equals(name);
    });

    it('Find or create with new User', async () => {
        const name = 'test';
        const user: User = {
            name: 'test',
            socket_id: undefined,
            updated_at: undefined,
            created_at: undefined,
            is_deleted: undefined
        };

        const userRepository = new UserRepository();

        sinon.stub(userRepository, 'findOne').resolves(undefined);
        sinon.stub(userRepository, 'save').resolves(user);

        const result = await userRepository.findOrCreate(name);

        expect(result.name).to.be.equals(name);
    });
});
