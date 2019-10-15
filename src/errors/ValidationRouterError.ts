// import { HttpError } from './HttpError';
import httpStatus = require('http-status');
import { BaseError } from './BaseError';

export class ValidationRouterError extends BaseError {
  constructor(message: string = '') {
    super(message, httpStatus.BAD_REQUEST, ValidationRouterError.name);
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
