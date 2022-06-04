import ReduxThunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import socketReducer from "./reducers/socket";
import accountReducer from "./reducers/account";

const rootReducer = combineReducers({
  socketStore: socketReducer,
  accountStore: accountReducer,
});
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
