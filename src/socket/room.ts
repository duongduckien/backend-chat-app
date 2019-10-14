export const room = (io: SocketIO.Server): void => {
  io.of('/rooms').on('connection', (socket) => {
    socket.on('createNewRoom', (newRoomInput) => {
      console.log('newRoomInput', newRoomInput);
      // Emit an updated list to everyone connected to the rooms page (every one else)
      socket.broadcast.emit('updateRoom', JSON.stringify(newRoomInput));
    });
  });
};
