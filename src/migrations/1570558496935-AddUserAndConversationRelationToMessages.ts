import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserAndConversationRelationToMessages1570558496935
    implements MigrationInterface {
    private userForeignKey = new TableForeignKey({
        name: 'fk_user_message',
        columnNames: ['users_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
    });

    private conversationForeignKey = new TableForeignKey({
        name: 'fk_conversation_message',
        columnNames: ['conversation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'conversation',
        onDelete: 'CASCADE'
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('messages', this.userForeignKey);
        await queryRunner.createForeignKey(
            'messages',
            this.conversationForeignKey
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('messages', this.userForeignKey);
        await queryRunner.dropForeignKey(
            'messages',
            this.conversationForeignKey
        );
    }
}
