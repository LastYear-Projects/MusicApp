"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = exports.setSocket = exports.socket = void 0;
let socket;
const setSocket = (io) => {
    io.on('connection', (clientSocket) => {
        // Assign the first connected socket to the variable
        if (!socket) {
            exports.socket = socket = clientSocket;
        }
    });
};
exports.setSocket = setSocket;
const getSocket = () => {
    return socket;
};
exports.getSocket = getSocket;
//# sourceMappingURL=socketService.js.map