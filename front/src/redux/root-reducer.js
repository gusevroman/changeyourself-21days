import { LOGGINED, LOGOUT } from "./action-types";

const initialState = {
  isLoggined: localStorage.isLoggined || false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGINED:
      if ( !action.noSave ){
        localStorage.isLoggined = action.login;
      }
      return {
        ...state,
        isLoggined: action.login
      }
      case LOGOUT:
        delete localStorage.isLoggined;
      return {
        state: initialState
      }
    default:
      return state;
  }
};
