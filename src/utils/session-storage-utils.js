const setUserRoleToSessionStorage = (userRole) => {
  sessionStorage.setItem("role", userRole);
};

export { setUserRoleToSessionStorage };
