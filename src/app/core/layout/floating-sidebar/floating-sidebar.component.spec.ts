import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { FloatingSidebarComponent } from './floating-sidebar.component';
import { icons } from '../layout.icons';

describe('FloatingSidebarComponent', () => {
  let component: FloatingSidebarComponent;
  let fixture: ComponentFixture<FloatingSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloatingSidebarComponent],
      imports: [NoopAnimationsModule, SvgIconsModule.forRoot({ icons })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
