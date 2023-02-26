const adminPagesConfig = [
  {
    // This is the configuration for the "Flows" page
    title: "Flows",
    route: "/flows"
  },
  {
    // This is the configuration for the "HOME" page
    title: "SURVEYS",
    route: "/surveys"
  }
];

const nonAdminPagesConfig = [
  {
    // This is the configuration for the "HOME" page
    title: "SURVEYS",
    route: "/surveys"
  }
];

const publicPagesConfig = [
  {
    // This is the configuration for the "HOME" page
    title: "HOME",
    route: "/home"
  },
  {
    // This is the configuration for the "Help" page
    title: "About Us",
    route: "/about"
  }
];

const userProfilePagesConfig = [
  {
    title: "Profile",
    route: "/profile"
  },
  {
    title: "Account",
    route: "/account"
  },
  {
    title: "Logout",
    route: "/logout"
  }
];

// This exports the configuration for the admin pages
export {
  adminPagesConfig,
  publicPagesConfig,
  nonAdminPagesConfig,
  userProfilePagesConfig
};
