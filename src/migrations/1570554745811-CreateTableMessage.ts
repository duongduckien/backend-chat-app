import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableMessage1570554745811 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: 'messages',
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
          unsigned: true,
          isPrimary: false,
          isNullable: false,
        },
        {
          name: 'users_id',
          type: 'int',
          unsigned: true,
          isPrimary: false,
          isNullable: false,
        },
        {
          name: 'message',
          type: 'text',
          isPrimary: false,
          isNullable: false,
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
    await queryRunner.dropTable('messages');
  }

}
