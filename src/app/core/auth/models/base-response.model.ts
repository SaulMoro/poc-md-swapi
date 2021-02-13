import { AuthToken } from './auth-token.model';
import { User } from './user.model';

export interface UsersBaseResponse {
  code?: number;
  status: 'success' | 'error';
  message: AuthToken | User | string;
}
