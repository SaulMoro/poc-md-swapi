import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EMPTY } from 'rxjs';

import { PeopleService } from './people.service';

describe('PeopleService', () => {
  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  it('should get not found if not exists', async (done) => {
    const service = setup();

    service.getPeople(9999).subscribe(
      () => EMPTY,
      (error: unknown) => {
        expect(error).toBeTruthy();
        done();
      },
    );
  });

  it('should get people if exists', async (done) => {
    const service = setup();

    service.getPeople(1).subscribe((res) => {
      console.log(res);
      expect(res).toBeTruthy();
      expect(res.name).toBeTruthy();
      done();
    });
  });
});

function setup(): PeopleService {
  // No necesitamos mockear datos, ni HttpClientTestingModule gracias al uso de MSW
  TestBed.configureTestingModule({ imports: [HttpClientModule] });
  return TestBed.inject(PeopleService);
}
