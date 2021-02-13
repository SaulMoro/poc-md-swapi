import { UsersHandlers } from './users/handlers';
import { StarshipsHandlers } from './starships/handlers';
import { FilmsHandlers } from './films/handlers';
import { PeopleHandlers } from './people/handlers';

export const handlers = [...UsersHandlers, ...StarshipsHandlers, ...FilmsHandlers, PeopleHandlers];
