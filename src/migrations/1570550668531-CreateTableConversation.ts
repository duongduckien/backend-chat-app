import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableConversation1570550668531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      const table = new Table({
        name: 'conversation',
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
            name: 'title',
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
          {
            name: 'is_deleted',
            type: 'tinyint',
            isPrimary: false,
            isNullable: false,
          },
        ],
      });
      await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('conversation');
    }

}
