import { BaseError } from './BaseError';
import { InternalServerError } from './InternalServerError';

export function errorHandler(
    error: BaseError,
    req: any,
    res: any,
    next: any
): any {
    res.status(error.code || new InternalServerError(error));
    res.json(error);
}

export function errorHandlerForSocket(error: BaseError) {
    error.code || new InternalServerError(error);
    return error;
}
