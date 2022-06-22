import { LOGIN_SUCCESFUL } from "../actions/account";
const initialState = {
  email: undefined,
  session: undefined,
  class: undefined,
  tokens: [],
};

const accountReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESFUL:
      console.log(LOGIN_SUCCESFUL);
      return {
        ...state,
        email: action.email,
        session: action.session,
        class: action.class,
        tokens: action.tokens || [],
      };
    default:
      return state;
  }
};

export default accountReducer;
