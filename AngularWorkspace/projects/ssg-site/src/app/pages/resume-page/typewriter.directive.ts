import { Directive, ElementRef, Input, OnChanges, SimpleChanges, Inject, PLATFORM_ID, OnDestroy, HostListener, Renderer2, afterNextRender, Injector } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTypewriter]',
  standalone: true
})
export class TypewriterDirective implements OnChanges, OnDestroy {
  @Input('appTypewriter') text: string = '';
  @Input() typingSpeed: number = 100;
  @Input() delay: number = 0;

  private intervalId: any;
  private currentOffset: number = 0;
  private hasStarted = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Ensure we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Use afterNextRender to wait for hydration to complete before modifying the DOM
      afterNextRender(() => {
        if (this.text && !this.hasStarted) {
           this.startTyping();
        }
      }, { injector: this.injector });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && !changes['text'].firstChange) {
       // If text changes AFTER the first valid render (e.g. language switch), restart
       if (isPlatformBrowser(this.platformId)) {
          this.text = this.text || '';
          this.startTyping();
       } else {
        this.renderer.setProperty(this.el.nativeElement, 'textContent', this.text);
       }
    }
  }

  private startTyping(): void {
    this.hasStarted = true;
    this.clearInterval();
    this.currentOffset = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', this.text);
      return;
    }

    // Initialize: Clear text and add cursor
    this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
    this.renderer.addClass(this.el.nativeElement, 'typewriter-cursor');

    setTimeout(() => {
      this.intervalId = setInterval(() => {
        if (this.currentOffset < this.text.length) {
          const currentContent = this.el.nativeElement.textContent;
          const nextChar = this.text.charAt(this.currentOffset);
          
          this.renderer.setProperty(this.el.nativeElement, 'textContent', currentContent + nextChar);
          this.currentOffset++;
        } else {
          this.clearInterval();
          // Optional: Remove cursor when done
          // this.renderer.removeClass(this.el.nativeElement, 'typewriter-cursor');
        }
      }, this.typingSpeed);
    }, this.delay);
  }

  private clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  @HostListener('window:beforeprint')
  onPrint(): void {
    this.clearInterval();
    this.renderer.setProperty(this.el.nativeElement, 'textContent', this.text);
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }
}