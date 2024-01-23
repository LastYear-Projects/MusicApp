import { Server} from "socket.io";

let socket:Server;  

const setSocket = (io:Server) => {
    socket = io;
}

const getSocket = () => {
    return socket;
}

export default { socket, setSocket, getSocket };
