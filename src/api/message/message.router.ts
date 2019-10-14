import * as express from 'express';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { getCustomRepository } from 'typeorm';
import { ConversationToUserRepository } from '../conversationtouser/conversationToUser.repository';
export class MessageRouter {
  private messageController: MessageController;

  constructor() {
    this.messageController = new MessageController();
  }

  public init(router: express.Router) {
    router
      .route('/message/unread/:users_id')
      .get((req, res, next) =>
        this.messageController.getAllUnReadMessagesByUserId(
          req,
          res,
          next,
          getCustomRepository(MessageRepository),
          getCustomRepository(ConversationToUserRepository),
        ),
      );
  }
}
