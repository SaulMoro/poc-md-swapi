import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { selectIsAdmin } from '../+state/auth.selectors';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  it('should be created', () => {
    const guard = setup();

    expect(guard).toBeTruthy();
  });

  it('should can Activate if is admin', async (done) => {
    const guard = setup(true);

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
      done();
    });
  });

  it('should cant Activate if not admin', async (done) => {
    const guard = setup(false);

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false);
      done();
    });
  });
});

function setup(isAdmin = false) {
  TestBed.configureTestingModule({
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectIsAdmin,
            value: isAdmin,
          },
        ],
      }),
    ],
  });

  return TestBed.inject(AdminGuard);
}
