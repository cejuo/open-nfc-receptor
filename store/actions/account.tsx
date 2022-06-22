import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGIN_SUCCESFUL = "LOGIN_SUCCESFUL";

export const sendToken = (token: any) => {
  return async (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      console.log("sendToken");
      const socket = getState().socketStore;
      const account = getState().accountStore;

      console.log(token);

      var _class = JSON.parse(token).class;
      console.log("token class");
      console.log(_class);
      console.log("admin class");
      console.log(account.class);

      if (_class != account.class) {
        resolve({ ok: false, reason: `El proveedor del token es ${_class}.\nTu proveedor es ${account.class}` });
        return;
      }

      if (!socket.isConnected) throw new Error("Not connected");

      socket.socket.emit("token:update", token, (response: any) => {
        console.log("token response:", response);
        resolve(response);
        dispatch({ type: "" });
      });
    });
  };
};

export const login = (email: string | null, password: string | undefined, session: string | null) => {
  return async (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      console.log("login");
      const socket = getState().socketStore;

      if (!socket.isConnected) throw new Error("Not connected");

      socket.socket.emit("user:login", { email: email, password: password, session: session }, (response: any) => {
        console.log("login response:", response);
        if (response.ok) {
          //@ts-ignore
          AsyncStorage.setItem("email", email);
          AsyncStorage.setItem("session", response.session);
          AsyncStorage.setItem("session", response.class);
          dispatch({
            type: LOGIN_SUCCESFUL,
            class: response.class,
            email: email,
            session: response.session,
            tokens: response.tokens,
          });
        }
        resolve(response);
      });
    });
  };
};
