export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  age: number;
  accessToken?: string;
  refreshToken?: string;
}
