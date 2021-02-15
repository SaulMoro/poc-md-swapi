import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { StarshipsComponent } from './starships.component';

describe('StarshipsComponent', () => {
  let component: StarshipsComponent;
  let fixture: ComponentFixture<StarshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarshipsComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
