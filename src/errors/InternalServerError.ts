import httpStatus from 'http-status';
import { BaseError } from './BaseError';

export class InternalServerError extends BaseError {
    constructor(message = 'Internal server error') {
        super(message, httpStatus.INTERNAL_SERVER_ERROR, InternalServerError.name);
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}
