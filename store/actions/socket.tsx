import { io } from "socket.io-client";

export const ERROR = "ERROR";
export const CONNECTED = "CONNECTED";
export const DISCONNECTED = "DISCONNECTED";
export const SAVE_SESSION = "SAVE_SESSION";

export const connectToSocket = () => {
  return async (dispatch: any, getState: any) => {
    console.log("ISDEV", __DEV__);

    const PORT = 4002;
    // prettier-ignore
    const DOMAIN = (!__DEV__ ? "http://192.168.1.88:" : "https://.com:") + PORT.toString();

    console.log("Connecting socket...");

    const socket = io(DOMAIN, {
      reconnection: true,
      reconnectionDelay: 3000,
      reconnectionDelayMax: 2000,
      reconnectionAttempts: 100,
      rejectUnauthorized: false,
    });

    socket.on("connect", () => {
      console.log("[*] Socket connected");
      // prettier-ignore
      dispatch({ type: CONNECTED, socket: socket, isConnected: socket.connected, error: false });
      // prettier-ignore
      return { type: CONNECTED, socket: socket, isConnected: socket.connected, error: false };
    });

    socket.on("connect_error", (error: any) => {
      console.log(`[!] Socket error`);
      console.log(error);
      // prettier-ignore
      dispatch({ type: ERROR, isConnected: false, error: error.toString() });
      // prettier-ignore
      return { type: ERROR, isConnected: false, error: error.toString() };
    });

    socket.on("disconnect", () => {
      console.log(`[i] Socket disconnected`);
      // prettier-ignore
      dispatch({ type: DISCONNECTED, isConnected: false });
      // prettier-ignore
      return { type: DISCONNECTED, isConnected: false };
    });
  };
};
