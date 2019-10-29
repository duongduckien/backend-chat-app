import { expect, sinon } from '../../helpers/chai';
import { NotFoundError } from '../../../errors/NotFoundError';
import { errorHandler, errorHandlerForSocket } from '../../../errors/ErrorHandler';
import 'mocha';

describe('Error Handler', () => {
    it('Handles Error with an error', () => {
        const res = { status: sinon.stub(), json: sinon.spy() };
        res.status.withArgs(404).returns(res);
        const req = {};
        const message = 'Not Found';
        const error = new NotFoundError(message);
        const next = {};
        errorHandler(error, req, res, next);

        return expect(res.json.withArgs(error)).to.be.calledOnce;
    });

    it('Handles Error with default error', () => {
        const res = { status: sinon.stub(), json: sinon.spy() };
        res.status.withArgs(404).returns(res);
        const req = {};
        const error = new Error();
        const next = {};
        errorHandler(error, req, res, next);

        expect(res.json.withArgs(error)).to.be.calledOnce;
    });

    it('Handles Error for socket with an error', () => {
        const message = 'Not Found';
        const error = new NotFoundError(message);
        errorHandlerForSocket(error);
        const expectedResult = errorHandlerForSocket(error);
        expect(expectedResult).to.haveOwnProperty('message', 'Not Found');
        expect(expectedResult).to.haveOwnProperty('code');
    });

    it('Handles Error for socket with default error', () => {
        const error = new Error();
        const expectedResult = errorHandlerForSocket(error);
        expect(expectedResult).to.haveOwnProperty('message', 'Internal server error');
        expect(expectedResult).to.haveOwnProperty('code');
    });
});
