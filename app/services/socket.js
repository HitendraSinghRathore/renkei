import { io } from "socket.io-client";
import { API_DOMAIN } from "./api";

let socket = null;
export const SOCKET_EVENTS = {
    JOIN_PROJECT: 'JOIN_PROJECT',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
    DELETE_PROJECT: 'DELETE_PROJECT',
    ACTIVE_USERS: 'ACTIVE_USERS',
    KICKED_OUT: 'KICKED_OUT'
};
export const connectSocket = (userId, projectId) => {
    if (!socket) {
        socket = io(API_DOMAIN, {
          transports: ["websocket"]
        });
      }
      socket.emit(SOCKET_EVENTS.JOIN_PROJECT, { userId, projectId },() => {});
      return socket;
}
export function disconnectSocket() {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
  