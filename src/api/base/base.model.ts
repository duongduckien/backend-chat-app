import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class BaseModel {
    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    public created_at: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    public updated_at: Date;

    @Column()
    public is_deleted: number;
}
