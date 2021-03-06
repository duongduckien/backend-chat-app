import * as express from 'express';
import { ConversationToUserRepository } from './conversationToUser.repository';
import { NotFoundError } from '../../errors/NotFoundError';
import Conversation from '../conversation/conversation.model';
import ConversationToUser from './conversationToUser.model';
import User from '../user/user.model';
import { MessageRepository } from '../message/message.repository';

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
            if (conversationToUser.length === 0) {
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

    public async getListUserByConversationId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        conversationToUserRepository: ConversationToUserRepository,
        messageRepository: MessageRepository,
    ) {
        try {
            const conversation: any = { users: [], messages: [] };
            const users: User[] = [];

            const [conversationToUser, conversationMessage] = await Promise.all(
                [
                    conversationToUserRepository.find({
                        where: {
                            conversation_id: req.params.conversation_id,
                        },
                        relations: ['user'],
                    }),
                    messageRepository.find({
                        where: {
                            conversation_id: req.params.conversation_id,
                        },
                        order: {
                            created_at: 'DESC',
                        },
                    }),
                ],
            );

            if (conversationToUser && conversationToUser.length > 0) {
                for (const item of conversationToUser) {
                    users.push(item.user);
                }
            }

            conversation.users.push(users);
            conversation.messages.push(conversationMessage);

            res.status(200).json(conversation);
        } catch (error) {
            next(error);
        }
    }

    public async update(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        conversationToUserRepository: ConversationToUserRepository,
    ) {
        try {
            const conversationToUser = await conversationToUserRepository
                .createQueryBuilder()
                .update(ConversationToUser)
                .set({ is_deleted: 0 })
                .where('id = :id', { id: req.params.id })
                .execute();

            res.status(200).json(conversationToUser);
        } catch (error) {
            next(error);
        }
    }
}
