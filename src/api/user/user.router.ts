import * as express from 'express';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { getCustomRepository } from 'typeorm';
import { validation } from '../../middlewares/validation';
import User from './user.model';
export class UserRouter {
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
  }

  public init(router: express.Router) {
    router
      .route('/users')
      .post(validation(User), (req, res, next) =>
        this.userController.create(req, res, next, getCustomRepository(UserRepository)),
      );
  }
}
