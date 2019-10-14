import { EntityRepository, Repository } from 'typeorm';
import Conversation from './conversation.model';

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<Conversation> {
  public async findOrCreate(title: string): Promise<Conversation> {
    let conversation = await this.findOne({
      title,
    });

    if (!conversation) {
      conversation = await this.save({
        title,
      });
    }

    return conversation;
  }
}
