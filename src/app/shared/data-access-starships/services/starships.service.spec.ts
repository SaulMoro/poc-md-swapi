import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EMPTY } from 'rxjs';

import { pageTwo } from '@md-starwars/mocks/starships/page-two.data';
import { ship } from '@md-starwars/mocks/starships/ship-2.data';
import { StarshipsService } from './starships.service';

describe('StarshipsService', () => {
  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  describe('getStarships', () => {
    it('should get not found if page not exists', async (done) => {
      const service = setup();

      service.getStarships(9999).subscribe(
        () => EMPTY,
        (error: unknown) => {
          expect(error).toBeTruthy();
          done();
        },
      );
    });

    it('should get starships if no page', async (done) => {
      const service = setup();

      service.getStarships().subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res.count).toBeTruthy();
        expect(res.results).toBeTruthy();
        done();
      });
    });

    it('should get starships if page', async (done) => {
      const service = setup();

      service.getStarships(2).subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res.count).toBe(pageTwo.count);
        expect(res.results).toEqual(pageTwo.results);
        done();
      });
    });
  });

  describe('getStarship', () => {
    it('should get not found if not exists', async (done) => {
      const service = setup();

      service.getStarship(9999).subscribe(
        () => EMPTY,
        (error: unknown) => {
          expect(error).toBeTruthy();
          done();
        },
      );
    });

    it('should get starship if exists', async (done) => {
      const service = setup();

      service.getStarship(2).subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res.name).toEqual(ship.name);
        done();
      });
    });
  });
});

function setup(): StarshipsService {
  // No necesitamos mockear datos, ni HttpClientTestingModule gracias al uso de MSW
  TestBed.configureTestingModule({ imports: [HttpClientModule] });
  return TestBed.inject(StarshipsService);
}
