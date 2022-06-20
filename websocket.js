var WebSocket = require("ws");
const { v4: uuidv4 } = require('uuid');

const clients = new Map();

module.exports = function () {
    const wsServer = new WebSocket.Server({
        path: "/websocket",
        port: 8081
    });

    wsServer.on('connection', (ws) => {
        const id = uuidv4();
        const color = Math.floor(Math.random() * 360);
        const metadata = { id, color };

        clients.set(ws, metadata);

        ws.on('message', (messageAsString) => {
            const message = JSON.parse(messageAsString);
            const metadata = clients.get(ws);

            message.sender = metadata.id;
            message.color = metadata.color;

            const outbound = JSON.stringify(message);
            console.log("mess", outbound);


            [...clients.keys()].forEach((client) => {
                client.send(outbound);
            });
        });
    });

    wsServer.on("close", () => {
        clients.delete(ws);
    });

    return wsServer;
}