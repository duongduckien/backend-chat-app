import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    OneToMany,
} from 'typeorm';
import { BaseModel } from '../base/base.model';
import { IsString, IsNotEmpty } from 'class-validator';
import ConversationToUser from '../conversationtouser/conversationToUser.model';
import Message from '../message/message.model';

@Entity({ name: 'conversation' })
@Unique('unique_index_title', ['title'])
class Conversation extends BaseModel {
    @PrimaryGeneratedColumn()
    public id?: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    public title: string;

    @OneToMany(
        (type) => ConversationToUser,
        (conversationToUser) => conversationToUser.conversation,
    )
    public conversationToUser?: ConversationToUser[];

    @OneToMany(
        (type) => ConversationToUser,
        (conversationToUser) => conversationToUser.conversation,
    )
    public messages?: Message[];

    constructor(conversation: Conversation) {
        super();
        this.id = conversation ? conversation.id : null;
        this.title = conversation ? conversation.title : null;
    }
}

export default Conversation;
