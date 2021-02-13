export type Roles = ['admin', 'user'] | ['user'] | [];

export interface User {
  name?: string;
  email: string;
  password?: string;
  roles?: Roles;
}
