export const ROLES = {
  ADMIN: 'Admin',
  ENGINEER: 'Engineer',
  VIEWER: 'Viewer'
};

export const hasPermission = (userRole, requiredRole) => {
  const roleHierarchy = {
    [ROLES.ADMIN]: [ROLES.ADMIN, ROLES.ENGINEER, ROLES.VIEWER],
    [ROLES.ENGINEER]: [ROLES.ENGINEER, ROLES.VIEWER],
    [ROLES.VIEWER]: [ROLES.VIEWER]
  };

  return roleHierarchy[userRole]?.includes(requiredRole) || false;
};

export const canManageShips = (userRole) => {
  return hasPermission(userRole, ROLES.ENGINEER);
};

export const canManageComponents = (userRole) => {
  return hasPermission(userRole, ROLES.ENGINEER);
};

export const canManageJobs = (userRole) => {
  return hasPermission(userRole, ROLES.ENGINEER);
};

export const canViewAnalytics = (userRole) => {
  return hasPermission(userRole, ROLES.VIEWER);
}; 