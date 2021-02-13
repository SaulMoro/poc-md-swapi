import { AuthToken } from './auth-token.model';
import { User } from './user.model';

export interface UsersResponse {
  code?: number;
  status: 'success' | 'error';
  message: AuthToken | User | string;
}
