import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  template: `
    <button aria-hidden="true" class="relative block focus:outline-none lg:-mt-1" (click)="onToggleTheme()">
      <div class="w-12 h-6 transition bg-gray-100 rounded-full outline-none"></div>
      <div
        class="absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-150 transform scale-110 rounded-full shadow-sm"
        [ngClass]="{
          'translate-x-0 -translate-y-px bg-white': !isDark,
          'translate-x-6 text-gray-200 bg-indigo-400': isDark
        }"
      >
        <svg-icon *ngIf="!isDark" key="moon" size="xs"></svg-icon>
        <svg-icon *ngIf="isDark" key="star" size="xs"></svg-icon>
      </div>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleThemeComponent {
  @Input() theme!: 'light' | 'dark';
  @Output() toggleTheme = new EventEmitter();

  onToggleTheme(): void {
    this.toggleTheme.emit();
  }

  get isDark() {
    return this.theme === 'dark';
  }
}
