export interface UsersApiResponse<T> {
  code?: number;
  status: 'success' | 'error';
  message: T;
}
