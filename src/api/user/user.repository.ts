import { EntityRepository, Repository } from 'typeorm';
import User from './user.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public getAll1(): Promise<User []> {
    return this.find();
  }
}
