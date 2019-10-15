import { validation } from '../../../middlewares/validation';
import { ValidationRouterError } from '../../../errors/ValidationRouterError';
import { expect, sinon } from '../../helpers/chai';
import User from '../../../api/user/user.model';
import 'mocha';

describe('Validation middleware', () => {
  it('pass through validation with User model', () => {
    const req: any = { body: { name: 'test' } };
    const res: any = {};
    const next = sinon.spy();

    validation(User)(req, res, next);
    return expect(next.withArgs()).to.be.calledOnce;
  });

  it('User validation with name is empty', () => {
    const req: any = { body: { name: '' } };
    const res: any = {};
    const next: any = sinon.spy();
    const validationRouterError: ValidationRouterError = new ValidationRouterError('name should not be empty');

    validation(User)(req, res, next, validationRouterError);
    return expect(next.withArgs(validationRouterError)).to.be.calledOnce;
  });

  it('User validation with name is null', () => {
    const req: any = { body: { name: null } };
    const res: any = {};
    const next: any = sinon.spy();
    const validationRouterError: ValidationRouterError = new ValidationRouterError('name should not be empty,name must be a string');

    validation(User)(req, res, next, validationRouterError);
    return expect(next.withArgs(validationRouterError)).to.be.calledOnce;
  });

  it('No passing error with name is empty', () => {
    const req: any = { body: { name: 'test' } };
    const res: any = {};
    const next: any = sinon.spy();

    validation(User)(req, res, next);
    return Promise.all([
      expect(next.withArgs(sinon.match.instanceOf(ValidationRouterError))).to.be.not.called,
      expect(next).to.be.calledOnce,
    ]);
  });
});
