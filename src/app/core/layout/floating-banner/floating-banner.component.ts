import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-floating-banner',
  templateUrl: './floating-banner.component.html',
  styleUrls: ['./floating-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingBannerComponent {
  @Input() message = '';
  @Output() dismiss = new EventEmitter();

  close(): void {
    this.dismiss.emit();
  }
}
