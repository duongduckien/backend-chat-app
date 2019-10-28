import { EntityRepository, Repository } from 'typeorm';
import Message from './message.model';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {}
