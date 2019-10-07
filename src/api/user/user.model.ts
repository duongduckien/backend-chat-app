import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseModel } from '../base/base.model';

@Entity({ name: 'users' })
@Unique('unique_index_name', ['name'])
class User extends BaseModel {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;
}

export default User;
