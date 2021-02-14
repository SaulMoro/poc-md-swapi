import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSidebarComponent {
  @Input() loggedIn = false;
  @Output() openLogin = new EventEmitter();
  @Output() itemSelected = new EventEmitter();

  onOpenLogin(): void {
    this.openLogin.emit();
  }

  onSelectItem(): void {
    this.itemSelected.emit();
  }
}
