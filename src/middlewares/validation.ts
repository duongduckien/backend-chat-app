import { Validator, ValidationError } from 'class-validator';
import * as express from 'express';
import { ValidationRouterError } from '../errors/ValidationRouterError';

export function validation(type: any): express.RequestHandler {
  return (req, res, next) => {
    const validator = new Validator();
    const input = new type(req.body);
    const errors = validator.validateSync(input);
    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints))
        .join(', ');
      next(new ValidationRouterError(message));
    } else {
      req.body = input;
      next();
    }
  };
}
