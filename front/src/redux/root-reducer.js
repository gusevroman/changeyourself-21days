import { LOGGINED, LOGOUT, TARGETS, PROFILE } from "./action-types";

const initialState = {
  isLoggined: localStorage.isLoggined || false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGINED:
      if (!action.noSave) {
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
      return {
        ...state,
        targets: action.targets
      }
    case PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state;
  }
};
