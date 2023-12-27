import { Server, Socket } from 'socket.io';

let socket: Socket | undefined;

const setSocket = (io: Server): void => {
    socket = io;
};

const getSocket = (): Socket | undefined => {
    return socket;
};

export { socket, setSocket, getSocket };
