const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { verifyWsToken } = require('./src/middleware/VerifyToken');
const WsRoute = require('./src/routes/WsRoute');

function onSocketError(err) {
  console.error(err);
}

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', function connection(ws, request, client) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log(`Received message ${data} from user ${client} and url=${request.url}`);
    WsRoute.main(ws, request.url, client, data);
  });
});


server.on('upgrade', function upgrade(request, socket, head) {
  socket.on('error', onSocketError);

  // This function is not defined on purpose. Implement it with your own logic.
  verifyWsToken(request, function next(err, client) {
    if (err || !client) {
        console.log(err);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    socket.removeListener('error', onSocketError);

    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request, client);
    });
  });
});

server.listen(8080);