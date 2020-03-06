import { LOGGINED, LOGOUT, TARGETS } from "./action-types";

export const logIn = (login) => ({
  type: LOGGINED,
  login,
});
export const logout = () => ({
  type: LOGOUT,
});
export const showTargets = (targets) => ({
  type: TARGETS,
  targets: targets
});


export default {
  logIn,
  logout,
  showTargets
};
