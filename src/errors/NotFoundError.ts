// import { HttpError } from './HttpError';
import httpStatus from 'http-status';
import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message = 'Not found') {
    super(message, httpStatus.NOT_FOUND, NotFoundError.name);
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
