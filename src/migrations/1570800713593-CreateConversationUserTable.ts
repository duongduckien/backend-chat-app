import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConversationUserTable1570800713593
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: 'conversation_user',
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
          name: 'conversation_id',
          type: 'int',
          isPrimary: false,
          isNullable: false,
          unsigned: true,
        },
        {
          name: 'users_id',
          type: 'int',
          isPrimary: false,
          isNullable: false,
          unsigned: true,
        },
        {
          name: 'created_at',
          type: 'datetime',
          isPrimary: false,
          isNullable: true,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'datetime',
          isPrimary: false,
          isNullable: true,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'is_deleted',
          type: 'tinyint',
          isPrimary: false,
          isNullable: false,
          default: 0,
        },
      ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('conversation_user');
  }
}
