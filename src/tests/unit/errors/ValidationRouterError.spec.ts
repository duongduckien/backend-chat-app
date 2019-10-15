import { ValidationRouterError } from '../../../errors/ValidationRouterError';
// import { HttpError } from '../../../errors/HttpError';
import { BaseError } from '../../../errors/BaseError';
import { expect } from '../../helpers/chai';
import 'mocha';

describe('Validation Router Error', () => {
  it('is throwable', () => {
    expect(() => {
      throw new ValidationRouterError('Validate Router Error');
    })
      .to.throw()
      .and.to.haveOwnProperty('message', 'Validate Router Error');
    expect(new ValidationRouterError('')).to.haveOwnProperty('code');
  });

  it('holds custom message', () => {
    expect(new ValidationRouterError('my custom message')).to.haveOwnProperty(
      'message',
      'my custom message',
    );
    expect(new ValidationRouterError()).to.haveOwnProperty('code');
  });

  it('inherits from BaseError', () => {
    expect(new ValidationRouterError('')).to.be.an.instanceof(BaseError);
  });
});
