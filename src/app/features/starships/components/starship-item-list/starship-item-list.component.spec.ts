import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipItemListComponent } from './starship-item-list.component';

describe('StarshipItemListComponent', () => {
  let component: StarshipItemListComponent;
  let fixture: ComponentFixture<StarshipItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
