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

export interface callRejectedDetailsInterface {
  rejected: boolean;
  reason: string;
}
export interface WebRTCType {
  offer?: any;
  callerSocketId?: string | null;
  answer?: RTCSessionDescriptionInit;
}
