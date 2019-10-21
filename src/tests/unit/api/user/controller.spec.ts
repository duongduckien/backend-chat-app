import { expect, sinon } from '../../../helpers/chai';
import { UserController } from '../../../../api/user/user.controller';
import { BaseError } from '../../../../errors/BaseError';
import httpStatus from 'http-status';
import User from '../../../../api/user/user.model';
import 'mocha';

describe('User Controller', () => {
  it('create', async () => {
    const userRepository: any = {
      findOrCreate: sinon.stub(),
    };
    const req: any = {
      body: {
        name: 'test',
      },
    };

    const res: any = {
      status: sinon.stub(),
      json: sinon.spy(),
    };

    const next: any = sinon.spy();

    const user: User = {
      id: undefined,
      name: 'test',
      created_at: new Date(),
      updated_at: new Date(),
      socket_id: undefined,
      is_deleted: false,
    };

    userRepository.findOrCreate.returns(user);
    res.status.withArgs(httpStatus.OK).returns(res);
    await new UserController().create(req, res, next, userRepository);

    // tslint:disable: no-unused-expression
    expect(res.status.withArgs(200)).to.be.calledOnce;
    expect(res.json.withArgs(user)).to.be.calledOnce;
  });

  it('throw BaseError when error in database', async () => {
    const userRepository: any = {
      findOrCreate: sinon.stub(),
    };
    const req: any = {};
    const res: any = {};
    const next: any = sinon.spy();
    userRepository.findOrCreate.rejects(BaseError);

    await new UserController().create(req, res, next, userRepository);

    expect(next.withArgs(sinon.match.instanceOf(BaseError))).to.be.not.called;
  });
});
