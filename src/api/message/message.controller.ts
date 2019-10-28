import * as express from 'express';
import { MessageRepository } from './message.repository';
import { ConversationToUserRepository } from '../conversationtouser/conversationToUser.repository';
import { LessThan, MoreThanOrEqual } from 'typeorm';

export class MessageController {
    public async getAllUnReadMessagesByUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        messageRepository: MessageRepository,
        conversationToUserRepository: ConversationToUserRepository
    ) {
        try {
            let messages_object: object = {};
            const groups = await conversationToUserRepository.find({
                where: {
                    users_id: req.params.users_id
                }
            });

            if (groups && groups.length > 0) {
                for (const item of groups) {
                    const messages = await messageRepository.find({
                        where: {
                            and: [
                                { create_at: MoreThanOrEqual(item.updated_at) },
                                { create_at: LessThan(item.updated_at) }
                            ]
                        }
                    });

                    messages_object = Object.assign({
                        [item.conversation_id]: messages
                    });
                }
            }

            res.status(200).json(messages_object);
        } catch (error) {
            next(error);
        }
    }

    public async create(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        messageRepository: MessageRepository
    ) {
        try {
            const user = await messageRepository.save(req.body.message);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
