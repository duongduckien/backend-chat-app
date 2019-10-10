import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseModel } from '../base/base.model';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity({ name: 'users' })
@Unique('unique_index_name', ['name'])
class User extends BaseModel {
  @PrimaryGeneratedColumn()
  public id?: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  public name: string;

  constructor(user: User) {
    super();
    this.id = user ? user.id : null;
    this.name = user ? user.name : null;
  }
}

export default User;
