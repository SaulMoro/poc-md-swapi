import { User } from './user.model';
import { UsersBaseResponse } from './base-response.model';

export interface SignInResponse extends UsersBaseResponse {
  message: User;
}
