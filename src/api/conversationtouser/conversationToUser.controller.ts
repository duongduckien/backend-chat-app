import * as express from 'express';
import { ConversationToUserRepository } from './conversationToUser.repository';
import { NotFoundError } from '../../errors/NotFoundError';
import Conversation from '../conversation/conversation.model';

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

  public async getListConversationByUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    conversationToUserRepository: ConversationToUserRepository,
  ) {
    try {
      const conversation: Conversation[] = [];
      const conversationToUser = await conversationToUserRepository.find({
        where: {
          users_id: req.params.users_id,
        },
        relations: ['conversation'],
      });

      if (conversationToUser && conversationToUser.length > 0) {
        for (const item of conversationToUser) {
          conversation.push(item.conversation);
        }
      }

      res.status(200).json(conversation);
    } catch (error) {
      next(error);
    }
  }
}
