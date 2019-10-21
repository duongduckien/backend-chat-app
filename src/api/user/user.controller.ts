import * as express from 'express';
import { UserRepository } from './user.repository';

export class UserController {
    public async create(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        userRepository: UserRepository,
    ) {
        try {
            const user = await userRepository.findOrCreate(req.body.name);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
