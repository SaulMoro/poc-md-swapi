export type Role = 'admin' | 'client' | 'user';
export type Roles = ['admin', 'client'] | ['client'] | ['user'];

export interface User {
  name?: string;
  email: string;
  password?: string;
  roles?: Roles;
}
