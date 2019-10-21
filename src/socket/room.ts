export const room = (io: SocketIO.Server): void => {
    io.of('/rooms').on('connection', socket => {
        const socketId = socket.id;
        try {
            socket.on('createNewRoom', newRoomInput => {
                socket.emit('updateRoom', JSON.stringify(newRoomInput));
                // Emit an updated list to everyone connected to the rooms page (every one else)
                socket.broadcast.emit(
                    'updateRoom',
                    JSON.stringify(newRoomInput)
                );
            });
        } catch (error) {
            io.to(socketId).emit('error', {
                code: 500,
                message: error.message
            });
        }
    });
};
