import { expect, sinon } from '../../helpers/chai';
import { NotFoundError } from '../../../errors/NotFoundError';
import { errorHandler } from '../../../errors/ErrorHandler';
import 'mocha';
describe('ErrorHandler', () => {
  it('Handles Error', () => {
    const res = { status: sinon.stub(), json: sinon.spy() };
    res.status.withArgs(404).returns(res);
    const req = {};
    const message = 'Not Found';
    const error = new NotFoundError(message);
    const next = {};
    errorHandler(error, req, res, next);

    return expect(res.json.withArgs(error)).to.be.calledOnce;
  });
});
