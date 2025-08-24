const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const server = new WebSocket.Server({ port: PORT });

server.on('connection', socket => {
  console.log('Client connecté');

  socket.on('message', message => {
    console.log('Message reçu :', message);
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('Client déconnecté');
  });
});

console.log(`Serveur WebSocket lancé sur le port ${PORT}`);
