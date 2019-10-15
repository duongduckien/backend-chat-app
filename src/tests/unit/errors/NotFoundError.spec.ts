import { NotFoundError } from '../../../errors/NotFoundError';
import { BaseError } from '../../../errors/BaseError';
// import { HttpError } from '../../../errors/HttpError';
import { expect } from '../../helpers/chai';
import 'mocha';

describe('Not Found error', () => {
  it('is throwable', () => {
    expect(() => {
      throw new NotFoundError();
    })
      .to.throw()
      .and.to.haveOwnProperty('message', 'Not found');
  });

  it('holds custom message', () => {
    expect(new NotFoundError('my custom message')).to.haveOwnProperty(
      'message',
      'my custom message',
    );
    expect(new NotFoundError()).to.haveOwnProperty('code');
  });

  it('inherits from BaseError', () => {
    expect(new NotFoundError()).to.be.an.instanceof(BaseError);
  });

});
