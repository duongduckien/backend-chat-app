import { HttpError } from "./HttpError";

export function errorHandler(error: HttpError, req: any, res: any, next: any): any {
  res.status(error.code);
  res.json(error);
}
