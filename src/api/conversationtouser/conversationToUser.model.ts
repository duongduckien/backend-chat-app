import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import Conversation from '../conversation/conversation.model';
import User from '../user/user.model';
import { BaseModel } from '../base/base.model';
import { IsNumber, IsNotEmpty } from 'class-validator';
@Entity({ name: 'conversation_user' })
class ConversationToUser extends BaseModel {
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

  constructor(conversationToUser: ConversationToUser) {
    super();
    this.users_id = conversationToUser ? conversationToUser.users_id : null;
    this.conversation_id = conversationToUser
      ? conversationToUser.conversation_id
      : null;
  }
}

export default ConversationToUser;
