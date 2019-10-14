import express from 'express';
import { UserRouter } from '../api/user/user.router';
import { ConversationRouter } from '../api/conversation/conversation.router';
import { ConversationToUserRouter } from '../api/conversationtouser/conversationToUser.router';
import { MessageRouter } from '../api/message/message.router';
export class Routes {
  public static init(app: express.Application, router: express.Router): void {
    new UserRouter().init(router);
    new ConversationRouter().init(router);
    new ConversationToUserRouter().init(router);
    new MessageRouter().init(router);
    app.use('/api', router);
  }
}
