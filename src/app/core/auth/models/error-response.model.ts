import { UsersBaseResponse } from './base-response.model';

export interface ErrorResponse extends UsersBaseResponse {
  message: string;
}
