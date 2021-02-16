import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { environment } from '@md-starwars/environment';
import { selectStarshipId, Starship } from '@md-starwars/shared/data-access-starships';

@Component({
  selector: 'app-starship-item-list',
  templateUrl: './starship-item-list.component.html',
  styleUrls: ['./starship-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipItemListComponent {
  @Input() starship: Starship | null = null;

  getImg(starship: Starship): string {
    const id = selectStarshipId(starship);
    return `${environment.swapiAssets}/starships/${id}.jpg`;
  }
}
