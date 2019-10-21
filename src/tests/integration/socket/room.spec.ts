import { expect } from '../../helpers/chai';
// import { env } from '../../../env';
import { initSocketServer } from '../../helpers/wsserver';
import { SocketConfig } from '../../../config/socket.conf';
import { room } from '../../../socket/room';
import io from 'socket.io-client';

describe('Room Socket', () => {
    let socket: any = null;
    let socket2: any = null;
    before('before', done => {
        initSocketServer();
        done();
    });

    beforeEach('fixtures', done => {
        // Setup
        room(SocketConfig.Instance);
        done();
    });

    it.only('Create new room ', done => {
        socket = io.connect(`http://localhost:3003/rooms`, {
            reconnectionDelay: 0,
            forceNew: true,
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
        socket = io.connect(`http://localhost:3003/rooms`, {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket']
        });

        socket2 = io.connect(`http://localhost:3003/rooms`, {
            reconnectionDelay: 0,
            forceNew: true,
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

    afterEach('after', done => {
        // Cleanup
        if (socket.connected) {
            socket.disconnect();
        }

        if (socket2 && socket2.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        }

        done();
    });
});
