import { EntityRepository, Repository } from 'typeorm';
import ConversationToUser from './conversationToUser.model';

@EntityRepository(ConversationToUser)
export class ConversationToUserRepository extends Repository<
    ConversationToUser
> {
    public async findOrCreate(
        users_id: number,
        conversation_id: number,
    ): Promise<ConversationToUser> {
        let conversationToUser = await this.findOne({
            users_id,
            conversation_id,
        });

        if (!conversationToUser) {
            conversationToUser = await this.save({
                users_id,
                conversation_id,
            });
        }

        return conversationToUser;
    }
}
