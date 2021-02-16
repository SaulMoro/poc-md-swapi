import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '@md-starwars/environment';
import { extractIdFromUrl } from '@md-starwars/shared/utils';
import {
  selectStarshipId,
  Starship,
  StarshipsActions,
  StarshipsSelectors,
} from '@md-starwars/shared/data-access-starships';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipDetailsComponent implements OnInit {
  loading$ = this.store.select(StarshipsSelectors.selectLoading);
  starship$ = this.store.select(StarshipsSelectors.selectSelectedStarship);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(StarshipsActions.enterStarshipDetailsPage());
  }

  getImg(starship: Starship): string {
    const id = selectStarshipId(starship);
    return `${environment.swapiAssets}/starships/${id}.jpg`;
  }

  getFilmImgFromUrl(filmUrl: string): string {
    const id = extractIdFromUrl(filmUrl);
    return `${environment.swapiAssets}/films/${id}.jpg`;
  }

  getPeopleImgFromUrl(peopleUrl: string): string {
    const id = extractIdFromUrl(peopleUrl);
    return `${environment.swapiAssets}/characters/${id}.jpg`;
  }

  trackByFn(index: number): number {
    return index;
  }
}
