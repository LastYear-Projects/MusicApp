let socket;


const setSocket = (io) => {
    socket = io;
}

const getSocket = () => {
    return socket;
}

module.exports=  { socket, setSocket, getSocket };
