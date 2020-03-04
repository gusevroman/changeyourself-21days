import { LOGGINED, LOGOUT } from "./action-types";

export const logIn = (login, noSave) => ({
  type: LOGGINED,
  login,
  noSave
});
export const logout = () => ({
  type: LOGOUT,
});


export default {
  logIn,
  logout,
};
