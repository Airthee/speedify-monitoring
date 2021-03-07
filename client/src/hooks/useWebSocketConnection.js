import webSocket from "../lib/websocket";
import { websocketConnection } from "../stores";

// Initialize websocket connection
// and update the store
export function useWebSocketConnection() {
  const ws = webSocket.connect();
  ws.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data);
      ws.dispatchEvent(new MessageEvent('jsonmessage', {
        data
      }));
    } catch (_) { }
  });
  websocketConnection.set(ws);
  return ws;
}