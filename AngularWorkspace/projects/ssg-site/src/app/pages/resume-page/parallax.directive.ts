import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class ParallaxDirective {
  @Input('appParallax') ratio: number = 0.1;

  constructor(private el: ElementRef, private renderer: Renderer2) {}


  onWindowScroll() {
    const scrollPosition = window.scrollY;
    // Move element slightly based on scroll position to create depth
    const offset = scrollPosition * this.ratio;
    
    // Use translate3d for hardware acceleration
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translate3d(0, ${offset}px, 0)`);
  }
}
