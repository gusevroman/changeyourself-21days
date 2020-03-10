import { LOGGINED, LOGOUT, TARGETS, PROFILE } from "./action-types";

export const logIn = (login, id) => ({
  type: LOGGINED,
  login,
  id
});
export const logout = () => ({
  type: LOGOUT,
});
export const showTargets = (targets) => ({
  type: TARGETS,
  targets: targets
});
export const showProfile = (profile) => ({
  type: PROFILE,
  profile: profile,
})


export default {
  logIn,
  logout,
  showTargets,
  showProfile,
};
