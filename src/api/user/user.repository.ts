import { EntityRepository, Repository } from 'typeorm';
import User from './user.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findOrCreate(name: string): Promise<User> {
    let user = await this.findOne({
      name,
    });

    if (!user) {
      user = await this.save({
        name,
      });
    }
    console.log('user', user);
    return user;
  }
}
