let ws;

/**
 * Instanciate a connection to the websocket server
 * If the connection is lost, it will retry to connect
 * @param {function} onSuccess function taking the WebSocket as first parameter
 */
const connect = () => {
  ws = new WebSocket(__app.env.WS_SERVER);

  ws.addEventListener('open', () => {
    console.log('Connected to websocket');
  });

  ws.addEventListener('close', (e) => {
    console.log('Connection closed. Reconnect will be attempted in 1 second', e.reason);
    setTimeout(connect, 1000);
  });

  ws.addEventListener('error', (err) => {
    console.log(`Error from websocket server: ${err}. Closing socket`);
    ws.close();
  });

  return ws;
}

export default {
  connect,
}