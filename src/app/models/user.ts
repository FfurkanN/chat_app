export interface User {
  id: string;
  firstname: string;
  lastname: string;
  userName: string;
  email: string;
  password: string;
  chats: string[];
  refreshToken: string;
  isOnline: boolean;
}
