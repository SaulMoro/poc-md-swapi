export * from './services/auth.service';
export * from './+state/auth.reducer';
export * from './+state/auth.effects';

import { User } from './models';
import * as AuthActions from './+state/auth.actions';
import * as AuthSelectors from './+state/auth.selectors';
export { User, AuthActions, AuthSelectors };
