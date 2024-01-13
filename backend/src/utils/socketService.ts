import { Socket } from "socket.io";

let socket:Socket;  //SOCKET ???  IO ???

const setSocket = (io:Socket) => {
    socket = io;
}

const getSocket = () => {
    return socket;
}

export default { socket, setSocket, getSocket };
