import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../api/user/user.repository';
import { ConversationToUserRepository } from '../api/conversationtouser/conversationToUser.repository';
import { errorHandlerForSocket } from '../errors/ErrorHandler';
export const chat = (io: SocketIO.Server): void => {
    io.of('/chatter').on('connection', socket => {
        const userRepository = getCustomRepository(UserRepository);
        const conversationToUserRepository = getCustomRepository(ConversationToUserRepository);
        const socketId = socket.id;
        socket.on('join', data => {
            try {
                socket.join(data.roomID);

                socket.broadcast
                    .to(data.roomID)
                    .emit('updateUsersList', JSON.stringify(data.users));
                socket.emit('updateUsersList', JSON.stringify(data.users));
            } catch (error) {
                console.log('error', error.message);
                io.to(socketId).emit('error', errorHandlerForSocket(error));
            }
        });

        socket.on('disconnect', async () => {
            try {
                // get user by socket id
                const user = await userRepository.findOne({
                    where: {
                        socket_id: socket.id,
                    },
                });
                const listConversationToUser  = await conversationToUserRepository.find({
                    where: {
                        users_id: user.id,
                    },
                });
                socket.leaveAll();

                for (const item of listConversationToUser) {
                    socket.broadcast
                    .to(item.conversation_id.toString())
                    .emit('updateUsersList', JSON.stringify(item));
                    item.updated_at = new Date();
                    await conversationToUserRepository.save(item);
                }
            } catch (error) {
              console.log('error', error.message);
              io.to(socketId).emit('error', errorHandlerForSocket(error));
            }
        });

        socket.on('newMessage', data => {
          try {
            socket.to(data.conversation_id).emit('inMessage', JSON.stringify(data));
          } catch (error) {
            io.to(socketId).emit('error1', errorHandlerForSocket(error));
          }
        });
    });
};
