import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragScroll]',
  standalone: true
})
export class DragScrollDirective {
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

  constructor(private el: ElementRef) {
    // 增加 grab 手勢游標，提示使用者可以抓取
    this.el.nativeElement.style.cursor = 'grab';
    // 防止選取文字，讓拖曳體驗更好
    this.el.nativeElement.style.userSelect = 'none';
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.isDown = true;
    this.el.nativeElement.classList.add('active');
    this.el.nativeElement.style.cursor = 'grabbing';

    // 記錄點擊時的初始位置與目前的捲動距離
    this.startX = e.pageX - this.el.nativeElement.offsetLeft;
    this.scrollLeft = this.el.nativeElement.scrollLeft;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDown = false;
    this.el.nativeElement.classList.remove('active');
    this.el.nativeElement.style.cursor = 'grab';
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDown = false;
    this.el.nativeElement.classList.remove('active');
    this.el.nativeElement.style.cursor = 'grab';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDown) return;

    e.preventDefault(); // 防止預設的文字選取行為

    const x = e.pageX - this.el.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2; // *2 是為了加快拖曳速度 (靈敏度)
    this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
