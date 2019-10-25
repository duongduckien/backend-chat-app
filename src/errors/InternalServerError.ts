import httpStatus from 'http-status';
import { BaseError } from './BaseError';

export class InternalServerError extends BaseError {
    constructor(error: any) {
        super(
            error.message,
            httpStatus.INTERNAL_SERVER_ERROR,
            InternalServerError.name,
            error.stack,
        );
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}