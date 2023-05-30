export interface DashboardStateTypes {
  dashboard: {
    userName: string;
    activeUsers: string[];
  };
  call: {
    localStream: object;
  };
}
export interface SockedTypes {
  userName: string;
  socketId: string;
}
