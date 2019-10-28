import {
    migrateDatabase,
    closeDbConnection
} from '../../helpers/database';
import { expect } from '../../helpers/chai';
import { env } from '../../../env';
import { initSocketServer } from '../../helpers/wsserver';
import { SocketConfig } from '../../../config/socket.conf';
import { room } from '../../../socket/room';
import { DBConfig } from '../../../config/db.conf';
import { createUser } from '../../helpers/fixtures';
import { Connection } from 'typeorm';
import config from '../../../../ormconfig';
import io from 'socket.io-client';

describe('Room Socket', () => {
    let socket: any = null;
    let socket2: any = null;
    let connection: Connection = null;
    before('before', async () => {
        initSocketServer();
        await DBConfig.init(config);
        connection = DBConfig.Instance;
        await migrateDatabase(connection);
        room(SocketConfig.Instance);
    });

    after('after', async () => {
        await closeDbConnection(connection);
    });

    afterEach('after', done => {
        // Cleanup
        if (socket.connected) {
            console.log('socket 1 disconnecting...');
            socket.disconnect();
            socket = null;
        }

        if (socket2 && socket2.connected) {
            console.log('socket 2 disconnecting...');
            socket2.disconnect();
            socket2 = null;
        }

        done();
    });

    it('Create new room ', done => {
        socket = io.connect(`http://localhost:${env.app.port}/rooms`, {
            transports: ['websocket']
        });

        const name = 'test';
        socket.on('connect', () => {
            socket.emit('createNewRoom', name);
        });

        socket.on('updateRoom', (chatrooms: string) => {
            expect(JSON.parse(chatrooms)).to.equals(name);
            done();
        });
    });

    it('Create new room for many users', done => {
        socket = io.connect(`http://localhost:${env.app.port}/rooms`, {
            transports: ['websocket']
        });

        socket2 = io.connect(`http://localhost:${env.app.port}/rooms`, {
            transports: ['websocket']
        });

        const name = 'test2';
        socket.emit('createNewRoom', name);

        socket.on('updateRoom', (chatrooms: string) => {
            expect(JSON.parse(chatrooms)).to.equals(name);
        });

        socket2.on('updateRoom', (chatrooms: string) => {
            expect(JSON.parse(chatrooms)).to.equals(name);
        });

        setTimeout(() => {
            done();
        }, 2000);
    });

    it('Init Group Chat', async () => {
        const user = await createUser('test', 'users', DBConfig.Instance);
        socket = io.connect(`http://localhost:${env.app.port}/rooms`, {
            transports: ['websocket']
        });

        socket.emit('initGroupChat', user.identifiers[0].id, (response: any) => {
            expect(response).to.equals('init group chat success');
        });

    });

    it('Init Group Chat with error', done => {
        socket = io.connect(`http://localhost:${env.app.port}/rooms`, {
            transports: ['websocket']
        });

        const id = 11111;
        socket.emit('initGroupChat', id);

        socket.on('errorHanlder', (error: any) => {
            expect(error).to.haveOwnProperty(
                'message',
                'User not found with id: ' + id
            );
            done();
        });

    });

});
