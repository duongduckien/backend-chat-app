import { Validator, ValidationError } from 'class-validator';
import * as express from 'express';
import { ValidationRouterError } from '../errors/ValidationRouterError';

export function validation(type: any): any {
  return (req: express.Request, res: express.Response, next: express.NextFunction, error: ValidationRouterError) => {
    if (!error) {
      error = new ValidationRouterError();
    }
    const validator = new Validator();
    const input = new type(req.body);
    const errorsMsg = validator.validateSync(input);
    if (errorsMsg.length > 0) {
      const message = errorsMsg
        .map((errorMsg: ValidationError) => Object.values(errorMsg.constraints))
        .join(', ');
      error.message = message;
      next(error);
    } else {
      req.body = input;
      next();
    }
  };
}
