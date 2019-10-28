import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserAndConversationRelationToConversationUser1570801049776
    implements MigrationInterface {
    private userForeignKey = new TableForeignKey({
        name: 'fk_user_conversationuser',
        columnNames: ['users_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
    });

    private conversationForeignKey = new TableForeignKey({
        name: 'fk_conversation_conversationuser',
        columnNames: ['conversation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'conversation',
        onDelete: 'CASCADE'
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey(
            'conversation_user',
            this.userForeignKey
        );
        await queryRunner.createForeignKey(
            'conversation_user',
            this.conversationForeignKey
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey(
            'conversation_user',
            this.userForeignKey
        );
        await queryRunner.dropForeignKey(
            'conversation_user',
            this.conversationForeignKey
        );
    }
}
