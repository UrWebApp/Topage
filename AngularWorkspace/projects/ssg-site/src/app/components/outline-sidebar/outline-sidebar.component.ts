import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, signal } from '@angular/core';

// 您已有的介面
export interface OutlineLink {
  level: number;
  text: string;
  id: string;
}

@Component({
  selector: 'app-outline-sidebar',
  standalone: true,
  imports: [], // CommonModule 不需要，因為我們使用原生控制流
  templateUrl: './outline-sidebar.component.html',
  styleUrl: './outline-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // 建議加入
})
export class OutlineSidebarComponent implements OnInit, OnDestroy {
  @Input() links: OutlineLink[] = [];

  protected activeLinkId = signal<string | null>(null);
  private observer!: IntersectionObserver;

  // --- ✨ 請將這個方法完整複製到您的 class 中 ✨ ---
  /**
   * 處理側邊欄連結的點擊事件，實現平滑滾動。
   * @param event - 滑鼠點擊事件對象
   * @param linkId - 要滾動到的目標元素的 ID
   */
  protected onLinkClick(event: MouseEvent, linkId: string): void {
    // 1. 阻止 <a> 標籤的預設跳轉行為
    event.preventDefault();

    // 2. 根據 ID 尋找文章中的對應標題元素
    const element = document.getElementById(linkId);

    // 3. 如果找到了元素，就執行滾動
    if (element) {
      // 4. 計算滾動位置，需要減去上方固定導航欄的高度
      //    'top-28' 在 Tailwind 中是 7rem (112px)。我們多留一點緩衝，設為 120px。
      //    您可以根據您的 header 實際高度調整這個數值。
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // 5. 使用瀏覽器原生 API 執行平滑滾動
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // 6. (可選但推薦) 立即更新高亮連結，提供即時反饋
      this.activeLinkId.set(linkId);
    }
  }

  // 您已有的 ngOnInit 和 ngOnDestroy 方法保持不變
  ngOnInit(): void {
    setTimeout(() => {
      if (typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined') {
        this.initializeObserver();
      }
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // 您已有的 initializeObserver 方法保持不變
  private initializeObserver(): void {
    const headingElements = this.links
      .map(link => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) {
      return;
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeLinkId.set(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 1.0
    });

    headingElements.forEach(el => this.observer.observe(el));
  }
}
