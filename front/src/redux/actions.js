import { LOGGINED, LOGOUT } from "./action-types";

export const logIn = (login) => ({
  type: LOGGINED,
  login,
});
export const logout = () => ({
  type: LOGOUT,
});


export default {
  logIn,
  logout,
};
