import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { icons } from '@md-starwars/shared/shared.icons';
import { StarshipItemListComponent } from './starship-item-list.component';

describe('StarshipItemListComponent', () => {
  let component: StarshipItemListComponent;
  let fixture: ComponentFixture<StarshipItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgIconsModule.forRoot({ icons })],
      declarations: [StarshipItemListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
