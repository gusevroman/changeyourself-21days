import { LOGGINED, LOGOUT, TARGETS } from "./action-types";

const initialState = {
  isLoggined: localStorage.isLoggined || true,
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
      case TARGETS:
        console.log('aaaaa');
        
      return {
        ...state,
        targets: action.targets
      }
    default:
      return state;
  }
};
