// import { getCustomRepository } from 'typeorm';
// import { UserRepository } from '../api/user/user.repository';
export const chat = (io: SocketIO.Server): void => {
  io.of('/chatter').on('connection', (socket) => {
    const socketId = socket.id;
    socket.on('join', (data) => {
      try {
        socket.join(data.roomID);

        socket.broadcast
          .to(data.roomID)
          .emit('updateUsersList', JSON.stringify(data.users));
        socket.emit('updateUsersList', JSON.stringify(data.users));
      } catch (error) {
        console.log('error', error.message);
        io.to(socketId).emit('error', { code: 500, message: error.message });
      }
    });

    socket.on('disconnect', () => {
      // try {
      //   // get user by socket id
      //   const userRepository = getCustomRepository(UserRepository);
      //   const user = userRepository.find({
      //     where: {
      //       socket_id: socket.id,
      //     },

      //   });
      //   socket.leaveAll
      //   socket.leave(room.roomID);
      //   socket.broadcast
      //     .to(room.roomID)
      //     .emit('updateUsersList', JSON.stringify(room.users));
      // } catch (error) {
      //   console.log('error', error.message);
      //   io.to(socketId).emit('error', { code: 500, message: error.message });
      // }
    });

    // socket.on('newMessage', data => {
    //   socket.to(data.roomID).emit('inMessage', JSON.stringify(data));
    // });
  });
};
