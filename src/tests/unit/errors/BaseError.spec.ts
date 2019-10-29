import { expect } from '../../helpers/chai';
import { BaseError } from '../../../errors/BaseError';
import 'mocha';
describe('BaseError Test', () => {
  it('Should return message, code, name ', () => {
    const baseError = new BaseError('Error', 100, 'Base Error');
    expect(baseError.message).to.equals('Error');
    expect(baseError.code).to.equals(100);
    expect(baseError.name).to.equals('Base Error');
  });
});
