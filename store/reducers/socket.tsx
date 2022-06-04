import { CONNECTED, DISCONNECTED, ERROR } from "../actions/socket";

const initialState = {
  socket: null,
  isConnected: false,
  error: false,
  errorMsg: "",
};

const socketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        socket: action.socket,
        isConnected: action.isConnected,
        error: action.error,
      };
    case DISCONNECTED:
      return {
        ...state,
        isConnected: action.isConnected,
      };
    case ERROR:
      return {
        ...state,
        isConnected: action.isConnected,
        error: action.error,
      };
    default:
      return state;
  }
};

export default socketReducer;
