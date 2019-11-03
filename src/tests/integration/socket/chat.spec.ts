import {
    migrateDatabase,
    closeDbConnection
} from '../../helpers/database';
import { expect } from '../../helpers/chai';
import { env } from '../../../env';
import { initSocketServer } from '../../helpers/wsserver';
import { SocketConfig } from '../../../config/socket.conf';
import { chat } from '../../../socket/chat';
import { DBConfig } from '../../../config/db.conf';
import { Connection } from 'typeorm';
import { createUser, createConversation } from '../../helpers/fixtures';
import config from '../../../../ormconfig';
import io from 'socket.io-client';

describe('Room Socket', () => {
    let socket: SocketIOClient.Socket = null;
    let socket2: SocketIOClient.Socket = null;
    let connection: Connection = null;
    before('before', async () => {
        initSocketServer();
        await DBConfig.init(config);
        connection = DBConfig.Instance;
        await migrateDatabase(connection);
        chat(SocketConfig.Instance);
    });

    after('after', async () => {
        await closeDbConnection(connection);
        SocketConfig.close();
    });

    afterEach('after', done => {
        // Cleanup
        if (socket.connected) {
            console.log('socket 1 disconnecting...');
            socket.disconnect();
            socket.close();
            socket = null;
        }

        if (socket2 && socket2.connected) {
            console.log('socket 2 disconnecting...');
            socket2.disconnect();
            socket2.close();
            socket2 = null;
        }

        done();
    });

    it('Join to room', (done) => {
        socket = io.connect(`http://localhost:${env.app.port}/chatter`, {
            transports: ['websocket']
        });

        socket2 = io.connect(`http://localhost:${env.app.port}/chatter`, {
            transports: ['websocket']
        });

        Promise.all([
            createUser('testUser', connection),
            createUser('testUser2', connection),
            createConversation('testConversation', connection)
        ]).then((values) => {
            const [user1, user2, conversation] = values;
            const listUser = [user1.identifiers[0].id, user2.identifiers[0].id];

            socket.emit('join', {
                conversation_id: conversation.identifiers[0].id,
                user_id: user1.identifiers[0].id
            });

            socket2.emit('join', {
                conversation_id: conversation.identifiers[0].id,
                user_id: user2.identifiers[0].id
            });

            socket.on('updateUsersList', (data: any) => {
                expect(listUser).to.be.include(JSON.parse(data).user_id);
            });

            socket2.on('updateUsersList', (data: any) => {
                expect(listUser).to.be.include(JSON.parse(data).user_id);
            });

            setTimeout(() => {
                done();
            }, 2000);
        });

    });

});
