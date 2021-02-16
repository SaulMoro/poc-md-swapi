import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  selectStarshipId,
  Starship,
  StarshipsActions,
  StarshipsSelectors,
} from '@md-starwars/shared/data-access-starships';

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipsListComponent implements OnInit {
  loading$ = this.store.select(StarshipsSelectors.selectLoading);
  starships$ = this.store.select(StarshipsSelectors.selectAllStarships);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(StarshipsActions.enterStarshipsPage());
  }

  onScrolled(): void {
    this.store.dispatch(StarshipsActions.scrollToNextStarshipsPage());
  }

  getStarshipId(starship: Starship): number {
    return selectStarshipId(starship);
  }

  trackByFn(_index: number, starship: Starship): number {
    return selectStarshipId(starship);
  }
}
