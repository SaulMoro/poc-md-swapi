import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() mainSidebar = false;
  @Input() theme!: 'light' | 'dark';
  @Input() loggedIn = false;
  @Output() toggleMainSidebar = new EventEmitter();
  @Output() toggleTheme = new EventEmitter();
  @Output() openLogin = new EventEmitter();

  onToggleMainSidebar(): void {
    this.toggleMainSidebar.emit();
  }

  onToggleTheme(): void {
    this.toggleTheme.emit();
  }

  onOpenLogin(): void {
    this.openLogin.emit();
  }

  trackByFn(index: number): number {
    return index;
  }
}
