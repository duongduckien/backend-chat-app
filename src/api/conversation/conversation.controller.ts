import * as express from 'express';
import { ConversationRepository } from './conversation.repository';
import { NotFoundError } from '../../errors/NotFoundError';

export class ConversationController {
    public async create(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        conversationRepository: ConversationRepository,
    ) {
        try {
            const user = await conversationRepository.findOrCreate(
                req.body.title,
            );

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async get(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        conversationRepository: ConversationRepository,
    ) {
        try {
            const conversation = await conversationRepository.findByIds([
                req.params.id,
            ]);
            if (conversation) {
                throw new NotFoundError('conversation not found');
            }
            res.status(200).json(conversation);
        } catch (error) {
            next(error);
        }
    }
}
