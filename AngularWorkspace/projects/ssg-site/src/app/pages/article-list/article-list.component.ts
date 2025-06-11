import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements AfterViewInit, OnDestroy {
  private isBrowser: boolean;
  private resizeHandler = () => this.adjustMasonryColumns();

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.adjustMasonryColumns();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    window.removeEventListener('resize', this.resizeHandler);
  }

  private adjustMasonryColumns(): void {
    if (!this.isBrowser) return;

    const masonryGrid = this.elRef.nativeElement.querySelector('.masonry-grid');
    if (!masonryGrid) return;

    if (window.innerWidth < 768) {
      masonryGrid.style.columnCount = '1';
    } else if (window.innerWidth < 1024) {
      masonryGrid.style.columnCount = '2';
    } else {
      masonryGrid.style.columnCount = '3';
    }
  }
}
