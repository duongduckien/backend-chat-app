import * as express from 'express';
import { ConversationToUserRepository } from './conversationToUser.repository';
import { NotFoundError } from '../../errors/NotFoundError';

export class ConversationToUserController {
  public async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    conversationToUserRepository: ConversationToUserRepository,
  ) {
    try {
      const conversationToUser = await conversationToUserRepository.findOrCreate(
        req.body.users_id,
        req.body.conversation_id,
      );

      res.status(200).json(conversationToUser);
    } catch (error) {
      next(error);
    }
  }

  public async get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    conversationToUserRepository: ConversationToUserRepository,
  ) {
    try {
      const conversationToUser = await conversationToUserRepository.findByIds(
        [req.params.id],
        { relations: ['user', 'conversation'] },
      );
      if (!conversationToUser) {
        throw new NotFoundError('ConversationToUser not found');
      }
      res.status(200).json(conversationToUser);
    } catch (error) {
      next(error);
    }
  }
}
