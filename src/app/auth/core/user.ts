/* Defines the user entity */
export interface IUser {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  ethAddress: string;
  category: string;
  status: string;
  port: number;
  ip: string;
  raftId: number;
  enode: string;
  token: string;
}
