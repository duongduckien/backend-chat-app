import { IsNotEmpty } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModel {
  @IsNotEmpty()
  @CreateDateColumn()
  public created_at: Date;

  @IsNotEmpty()
  @UpdateDateColumn()
  public updated_at: Date;
}
