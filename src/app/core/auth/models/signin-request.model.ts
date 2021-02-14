import { User } from './user.model';

export interface SignInRequest extends User {
  password: string;
}
