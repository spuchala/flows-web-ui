const isUserLoggedIn = (user) => {
  return user ? true : false;
};

const isLoggedInUserAnAdmin = (user) => {
  const userRole = user.userRole;
  return userRole.toLocaleLowerCase() === "admin";
};

export { isUserLoggedIn, isLoggedInUserAnAdmin };
