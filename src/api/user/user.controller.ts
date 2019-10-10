import * as express from 'express';
import { UserRepository } from './user.repository';
export class UserController {
  public async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    userRepository: UserRepository,
  ) {
    try {
      const users: any = await userRepository.find();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  public async createUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    userRepository: UserRepository,
  ) {
    try {
      const user = userRepository.findOrCreateUser(req.body.name);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
