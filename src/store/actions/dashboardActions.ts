export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME';
export const DASHBOARD_SET_ACTIVE_USERS = 'DASHBOARD_SET_ACTIVE_USERS';

export const setUserName = (username: any) => {
  return {
    type: DASHBOARD_SET_USERNAME,
    username
  };
};

export const setActiveUsers = (activeUsers: any) => {
  return {
    type: DASHBOARD_SET_ACTIVE_USERS,
    activeUsers
  };
};
