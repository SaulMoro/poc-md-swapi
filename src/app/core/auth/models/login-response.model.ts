import { AuthToken } from './auth-token.model';
import { UsersBaseResponse } from './base-response.model';

export interface LoginResponse extends UsersBaseResponse {
  message: AuthToken;
}
