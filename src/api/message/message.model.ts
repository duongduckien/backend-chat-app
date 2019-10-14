import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import Conversation from '../conversation/conversation.model';
import User from '../user/user.model';
import { BaseModel } from '../base/base.model';
import { IsNumber, IsNotEmpty } from 'class-validator';

@Entity({ name: 'messages' })
class Message extends BaseModel {
  @PrimaryGeneratedColumn()
  public id?: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  public users_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  public conversation_id: number;

  @ManyToOne((type) => User, (user) => user.conversationToUser)
  @JoinColumn({ name: "users_id" })
  public user?: User;

  @ManyToOne(
    (type) => Conversation,
    (conversation) => conversation.conversationToUser,
  )
  @JoinColumn({ name: "conversation_id" })
  public conversation?: Conversation;

  @Column()
  public message?: string;

  constructor(message: Message) {
    super();
    this.users_id = message ? message.users_id : null;
    this.conversation_id = message
      ? message.conversation_id
      : null;
    this.message = this.message ? message.message : null;
  }
}

export default Message;
