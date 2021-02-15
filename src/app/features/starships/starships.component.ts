import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { StarshipsActions } from '@md-starwars/shared/data-access-starships';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(StarshipsActions.enterStarshipsPage());
  }
}
