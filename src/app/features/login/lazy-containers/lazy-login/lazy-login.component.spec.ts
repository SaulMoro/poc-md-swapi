import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoginComponent } from './lazy-login.component';

describe('LazyLoginComponent', () => {
  let component: LazyLoginComponent;
  let fixture: ComponentFixture<LazyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyLoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
