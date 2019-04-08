/* Defines the user entity */
export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  ethAddress: string;
  category: string;
  status: string;
  port: number;
  ip: string;
  raftId: number;
  enode: string;
  token: string;
}
