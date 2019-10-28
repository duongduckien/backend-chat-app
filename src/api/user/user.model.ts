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

@Entity({ name: 'users' })
@Unique('unique_index_name', ['name'])
class User extends BaseModel {
    @PrimaryGeneratedColumn()
    public id?: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    public name: string;

    public socket_id: string;

    @OneToMany(
        (type) => ConversationToUser,
        (conversationToUser) => conversationToUser.user,
    )
    public conversationToUser?: ConversationToUser[];

    @OneToMany(
        (type) => ConversationToUser,
        (conversationToUser) => conversationToUser.conversation,
    )
    public messages?: Message[];

    constructor(user: User) {
        super();
        this.id = user ? user.id : null;
        this.name = user ? user.name : null;
        this.socket_id = user ? user.socket_id : null;
    }
}

export default User;
