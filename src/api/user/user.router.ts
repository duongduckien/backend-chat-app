import * as express from 'express';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { getCustomRepository } from 'typeorm';
export class UserRouter {
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
  }

  public init(router: express.Router) {
    router
      .route('/users')
      .get((req, res, next) =>
        this.userController.getAll(req, res, next, getCustomRepository(UserRepository)),
      );
      // .get(validation(UserDTO), (req, res, next) =>
      //   this.userController.getAll(req, res, next, new UserDAO())
      // );
  }
}
