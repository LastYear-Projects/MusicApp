let socket:string;
 //Socket is string???

const setSocket = (io:string) => {
    socket = io;
}

const getSocket = () => {
    return socket;
}

export default { socket, setSocket, getSocket };
