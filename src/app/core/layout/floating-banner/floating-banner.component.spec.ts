import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { FloatingBannerComponent } from './floating-banner.component';
import { icons } from '../layout.icons';

describe('FloatingBannerComponent', () => {
  let component: FloatingBannerComponent;
  let fixture: ComponentFixture<FloatingBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloatingBannerComponent],
      imports: [SvgIconsModule.forRoot({ icons })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
