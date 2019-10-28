import { getCustomRepository } from "typeorm";
import { ConversationToUserRepository } from "../api/conversationtouser/conversationToUser.repository";
import { UserRepository } from "../api/user/user.repository";
import { NotFoundError } from "../errors/NotFoundError";
import { errorHandlerForSocket } from "../errors/ErrorHandler";

export const room = (io: SocketIO.Server): void => {
    io.of('/rooms').on('connection', socket => {
        const userRepository = getCustomRepository(UserRepository);
        const conversationToUserRepository = getCustomRepository(ConversationToUserRepository);
        socket.on('createNewRoom', async newRoomInput => {
            try {
                socket.emit('updateRoom', JSON.stringify(newRoomInput));
                // Emit an updated list to everyone connected to the rooms page (every one else)
                socket.broadcast.emit(
                    'updateRoom',
                    JSON.stringify(newRoomInput)
                );
            } catch (error) {
                console.log('error socket: ', error);
                io.emit('error', errorHandlerForSocket(error));
            }
        });

        socket.on('initGroupChat', async (users_id, fn) => {
            try {
                const [user, listConversationToUser] = await Promise.all([
                    userRepository.findOne({
                        where: {
                            id: users_id,
                        },
                    }),
                    conversationToUserRepository.find({
                        where: {
                            users_id,
                        },
                    }),
                ]);
                if (!user) {
                    throw new NotFoundError('User not found with id: ' + users_id);
                }

                user.socket_id = socket.id;
                await userRepository.save(user);

                for (const item of listConversationToUser) {
                    socket.join(item.conversation_id.toString());
                    item.updated_at = new Date();
                    await conversationToUserRepository.save(item);
                }

                fn('init group chat success');
            } catch (error) {
                console.log('error socket: ', error);
                socket.emit('errorHanlder', errorHandlerForSocket(error));
            }
        });
    });
};
