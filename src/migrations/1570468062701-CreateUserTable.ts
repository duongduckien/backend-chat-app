import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1570468062701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isNullable: false,
          unsigned: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'created_at',
          type: 'datetime',
          isPrimary: false,
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'datetime',
          isPrimary: false,
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
