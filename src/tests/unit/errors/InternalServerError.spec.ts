import { InternalServerError } from '../../../errors/InternalServerError';
import { BaseError } from '../../../errors/BaseError';
import { expect } from '../../helpers/chai';
import 'mocha';

describe('Not Found error', () => {
    it('is throwable', () => {
        expect(() => {
            throw new InternalServerError();
        })
            .to.throw()
            .and.to.haveOwnProperty('message', 'Internal server error');
    });

    it('holds custom message', () => {
        expect(new InternalServerError('my custom message')).to.haveOwnProperty(
            'message',
            'my custom message'
        );
    });

    it('inherits from BaseError', () => {
        expect(new InternalServerError()).to.be.an.instanceof(BaseError);
    });
});
