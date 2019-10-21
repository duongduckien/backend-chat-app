import * as express from 'express';
import { ConversationToUserController } from './conversationToUser.controller';
import { ConversationToUserRepository } from './conversationToUser.repository';
import { MessageRepository } from '../message/message.repository';
import { getCustomRepository } from 'typeorm';
import { validation } from '../../middlewares/validation';
import ConversationToUser from './conversationToUser.model';
export class ConversationToUserRouter {
    private conversationToUserController: ConversationToUserController;

    constructor() {
        this.conversationToUserController = new ConversationToUserController();
    }

    public init(router: express.Router) {
        router
            .route('/conversationtouser')
            .post(validation(ConversationToUser), (req, res, next) =>
                this.conversationToUserController.create(
                    req,
                    res,
                    next,
                    getCustomRepository(ConversationToUserRepository),
                ),
            );

        router
            .route('/conversationtouser/:id')
            .get((req, res, next) =>
                this.conversationToUserController.get(
                    req,
                    res,
                    next,
                    getCustomRepository(ConversationToUserRepository),
                ),
            )
            .put((req, res, next) =>
                this.conversationToUserController.update(
                    req,
                    res,
                    next,
                    getCustomRepository(ConversationToUserRepository),
                ),
            );

        router
            .route('/conversationtouser/users/:users_id')
            .get((req, res, next) =>
                this.conversationToUserController.getListConversationByUserId(
                    req,
                    res,
                    next,
                    getCustomRepository(ConversationToUserRepository),
                ),
            );

        router
            .route('/conversationtouser/conversation/:conversation_id')
            .get((req, res, next) =>
                this.conversationToUserController.getListUserByConversationId(
                    req,
                    res,
                    next,
                    getCustomRepository(ConversationToUserRepository),
                    getCustomRepository(MessageRepository),
                ),
            );
    }
}
