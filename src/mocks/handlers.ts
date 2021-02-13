import { UsersHandlers } from './users/handlers';
import { StarshipsHandlers } from './starships/handlers';

export const handlers = [...UsersHandlers, ...StarshipsHandlers];
