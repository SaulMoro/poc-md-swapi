import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { StarshipsActions, StarshipsSelectors } from '@md-starwars/shared/data-access-starships';

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
}
