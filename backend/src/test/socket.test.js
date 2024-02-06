const { createServer } = require('http'); // to create a http server
const { Server } = require('socket.io');
const Client = require('socket.io-client');
const {handleClient} = require('../utils/sockets.ts');

describe('socket.io server', () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        handleClient(io); // Initialize your server-side socket handling
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on('connection', (socket) => {
                serverSocket = socket;
            });
            clientSocket.on('connect', done);
        });
    },10000);

    afterAll(() => {
        io.close();
        if (clientSocket) {
            clientSocket.close();
        }
    });

    test('should broadcast message', (done) => {
        const testMessage = { message: 'Hello world', userDetails: 'User1' };
        clientSocket.emit('message', testMessage);

        serverSocket.on('message', (msg) => {
            expect(msg.message).toBe('Hello world'); // Or expect the sanitized message
            expect(msg.userDetails).toBe('User1');
            done();
        });
    });


});