export class HttpError extends Error {
    public code: number;
    constructor(message = 'Internal server error') {
        super();

        Object.setPrototypeOf(this, HttpError.prototype);
        this.name = this.constructor.name;
        this.code = 500;
        this.message = message;
    }
}
