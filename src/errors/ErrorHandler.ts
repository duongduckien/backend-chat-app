import { InternalServerError } from './InternalServerError';

export function errorHandler(
    error: any,
    req: any,
    res: any,
    next: any
): any {
    res.status(error.code || new InternalServerError(error.message || undefined));
    res.json(error);
}

export function errorHandlerForSocket(error: any) {
    if (!error.code) {
        return new InternalServerError(error.message || undefined);
    }
    return error;
}
