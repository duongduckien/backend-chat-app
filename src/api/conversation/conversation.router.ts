import * as express from 'express';
import { ConversationController } from './conversation.controller';
import { ConversationRepository } from './conversation.repository';
import { getCustomRepository } from 'typeorm';
import { validation } from '../../middlewares/validation';
import Conversation from './conversation.model';
export class ConversationRouter {
  private conversationController: ConversationController;

  constructor() {
    this.conversationController = new ConversationController();
  }

  public init(router: express.Router) {
    router
      .route('/conversations')
      .post(validation(Conversation), (req, res, next) =>
        this.conversationController.create(
          req,
          res,
          next,
          getCustomRepository(ConversationRepository),
        ),
      );

    router
      .route('/conversation/:id')
      .get((req, res, next) =>
        this.conversationController.get(
          req,
          res,
          next,
          getCustomRepository(ConversationRepository),
        ),
      );
  }
}
