export const chat = (io: SocketIO.Server): void => {
  io.of('/chatter').on('connection', (socket) => {
    // socket.on('join', (data) => {
    //   try {

    //   } catch (error) {
    //   }

    //   let usersList = h.addUserToRoom(allrooms, data, socket);
    //   // Update the list of active users as shown on the chatroom page

    //   socket.broadcast
    //     .to(data.roomID)
    //     .emit('updateUsersList', JSON.stringify(usersList.users));
    //   socket.emit('updateUsersList', JSON.stringify(usersList.users));
    // });

    // // when a socket exits
    // socket.on('disconnect', () => {
    //   // Find the room, to which the socket is connected to and purge the user
    //   let room = h.removeUserFromRoom(allrooms, socket);
    //   socket.broadcast
    //     .to(room.roomID)
    //     .emit('updateUsersList', JSON.stringify(room.users));
    // });

    // // when a new message arrives
    // socket.on('newMessage', data => {
    //   socket.to(data.roomID).emit('inMessage', JSON.stringify(data));
    // });
  });
};
