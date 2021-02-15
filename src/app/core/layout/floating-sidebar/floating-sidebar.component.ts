import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { sidebarAnimation } from '../animations';

@Component({
  selector: 'app-floating-sidebar',
  templateUrl: './floating-sidebar.component.html',
  styleUrls: ['./floating-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sidebarAnimation],
})
export class FloatingSidebarComponent {
  @Input() display = false;
  @Output() closeSidebar = new EventEmitter();

  close(): void {
    this.closeSidebar.emit();
  }
}
