import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EMPTY } from 'rxjs';

import { FilmsService } from './films.service';

describe('FilmsService', () => {
  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  describe('getFilm', () => {
    it('should get not found if not exists', async (done) => {
      const service = setup();

      service.getFilm(9999).subscribe(
        () => EMPTY,
        (error: unknown) => {
          expect(error).toBeTruthy();
          done();
        },
      );
    });

    it('should get film if exists', async (done) => {
      const service = setup();

      service.getFilm(1).subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res.title).toBeTruthy();
        done();
      });
    });
  });
});

function setup(): FilmsService {
  // No necesitamos mockear datos, ni HttpClientTestingModule gracias al uso de MSW
  TestBed.configureTestingModule({ imports: [HttpClientModule] });
  return TestBed.inject(FilmsService);
}
