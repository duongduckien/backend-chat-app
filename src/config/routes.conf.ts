import express from 'express';
import { UserRouter } from '../api/user/user.router';
export class Routes {
  public static init(app: express.Application, router: express.Router): void {
    new UserRouter().init(router);
    app.use('/api', router);
  }
}
