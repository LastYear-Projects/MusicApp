import { Server, Socket } from 'socket.io';

let socket: Socket | undefined;

const setSocket = (io: Server): void => {
    io.on('connection', (clientSocket: Socket) => {
        // Assign the first connected socket to the variable
        if (!socket) {
            socket = clientSocket;
        }
    });
};

const getSocket = (): Socket | undefined => {
    return socket;
};

export { socket, setSocket, getSocket };
