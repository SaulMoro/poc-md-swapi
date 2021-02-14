export * from './data-access-starships.module';
import { Starship } from './models';
import * as StarshipsActions from './+state/starships.actions';
import * as StarshipsSelectors from './+state/starships.selectors';
export { Starship, StarshipsActions, StarshipsSelectors };
