export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    role: string;
  }
export interface UserSearch{
   id: number;
    username: string;
    email: string;
}