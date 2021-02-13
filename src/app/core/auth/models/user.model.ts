export interface User {
  name?: string;
  email: string;
  password?: string;
  role?: 'admin' | 'user';
}
