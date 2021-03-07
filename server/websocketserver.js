const WebSocket = require('ws');
const speedify = require('./lib/speedify');
const { ucFirst } = require('./lib/string');

const LISTENING_PORT = process.env.WS_PORT || 8080;

// Shared data
const sockets = [];
const speedifyData = {};

/**
 * Stringify the data
 * @param {*} data 
 */
const prepareData = (data) => {
  return typeof data !== 'string' ? JSON.stringify(data) : data;
}

/**
 * Send the data to all sockets
 * @param {*} data 
 */
const sendMessageToAll = (data) => {
  const stringData = prepareData(data);
  console.log(`sendMessageToAll: ${stringData}`);
  sockets.forEach(s => s.send(stringData));
}

/**
 * Send the data to the socket
 * @param {WebSocketClient} socket 
 * @param {*} data 
 */
const sendMessageToOne = (socket, data) => {
  const stringData = prepareData(data);
  console.log(`sendMessageToOne: ${stringData}`);
  socket.send(stringData);
}

/**
 * If the data has changed
 * it publishes the new data to the sockets
 * @param {string} name 
 * @param {*} value 
 */
const commitData = (name, value) => {
  if (JSON.stringify(speedifyData[name]) !== JSON.stringify(value)) {
    sendMessageToAll({
      'type': 'updatedState',
      'attributeName': name,
      'oldValue': speedifyData[name],
      'newValue': value,
    });
    speedifyData[name] = value;
  }
};

/**
 * Every 5 seconds, we check that the data has not changed
 */
const initUpdateLoop = () => {
  const data = [
    'state',
    'settings',
    'currentServer',
    'adapters',
    'user',
    'connectMethod',
    'version',
  ];

  return setInterval(() => {
    data.forEach(async (dataName) => {
      const methodName = 'get' + ucFirst(dataName);
      if (typeof speedify[methodName] !== 'function') {
        console.error(`Function ${methodName} is not defined in speedify`);
        return false;
      }
      const data = await speedify[methodName]();
      commitData(dataName, data);
      return true;
    })
  }, 5000);
}

/**
 * Initialise the server and all its events
 * @returns {WebSocketServer}
 */
const initServer = () => {
  const server = new WebSocket.Server({ port: LISTENING_PORT });

  server.on('connection', (socket) => {
    sockets.push(socket);

    // When a new connection occurs
    // we send it the current data
    sendMessageToOne(socket, {
      type: 'initialData',
      data: speedifyData
    });

    // When a socket closes, or disconnects, remove it from the array.
    socket.on('close', () => {
      sockets.splice(sockets.indexOf(socket), 1);
    });
  });

  return server;
}

module.exports = {
  listen() {
    console.log(`Websocket server listening on port ${LISTENING_PORT}...`);
    initUpdateLoop();
    initServer();
  }
}