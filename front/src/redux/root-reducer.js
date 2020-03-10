import { LOGGINED, LOGOUT, TARGETS, PROFILE } from "./action-types";

const initialState = {
  isLoggined: localStorage.isLoggined || false,
  userId: localStorage.userId || false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGINED:
      if (!action.noSave) {
        localStorage.isLoggined = action.login;
        localStorage.userId = action.id;
      }
      return {
        ...state,
        isLoggined: action.login,
        userId: action.id,
      }
    case LOGOUT:
      delete localStorage.isLoggined;
      delete localStorage.userId;
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
