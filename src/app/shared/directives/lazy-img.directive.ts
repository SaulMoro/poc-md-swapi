import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import 'lazysizes';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';

/* eslint-disable @angular-eslint/no-input-rename */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[lazyImg]',
})
export class LazyImgDirective implements AfterViewInit {
  /** The native element. */
  el: HTMLElement | null = null;

  /** The HTMLElement background-image value. */
  @Input('data-bg') dataBg: string | null = null;

  /** The HTMLImageElement sizes attribute. */
  @Input('data-sizes') dataSizes: string | null = null;

  /** HTMLImageElement src attribute. */
  @Input('data-src') src: string | null = null;

  /** HTMLImageElement srcset attribute. */
  @Input('data-srcset') srcSet: string | null = null;

  /** Fallback Img. */
  @Input() imgFallback: string | null = null;

  /** A transparent gif. */
  transparent = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.elementRef.nativeElement) {
      return;
    }
    this.el = this.elementRef.nativeElement;

    if (this.el?.tagName.toUpperCase() === 'IMG') {
      (this.el as HTMLImageElement).src = this.transparent;
      if (this.dataSizes) {
        this.renderer.setAttribute(this.el, 'data-sizes', this.dataSizes);
      }
      if (this.src) {
        this.renderer.setAttribute(this.el, 'data-src', this.src);
      }
      if (this.srcSet) {
        this.renderer.setAttribute(this.el, 'data-srcset', this.srcSet);
      }
    } else {
      this.renderer.setStyle(this.el, 'background-image', `url(${this.transparent})`);
      if (this.dataBg) {
        this.renderer.setAttribute(this.el, 'data-bg', this.dataBg);
      }
    }
    this.renderer.addClass(this.el, 'lazyload');
  }

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.elementRef.nativeElement;
    element.src = this.imgFallback || './assets/img/errorImg.svg';
  }
}
