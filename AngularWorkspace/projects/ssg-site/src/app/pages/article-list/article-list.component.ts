// src/app/pages/article-list/article-list.component.ts

import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { Article } from '../../services/routeTxt.resolver';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ArticleCardComponent],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private isBrowser: boolean;

  // --- 數據來源 ---
  private allArticles: Article[] = [];            // 原始的、未經篩選的所有文章

  // --- 分類篩選狀態 ---
  public categories: string[] = [];                // 從文章中提取的所有唯一分類
  public activeCategory: string | null = null;     // 當前選中的分類, null 代表 "全部"

  // --- 分頁狀態屬性 ---
  public filteredArticles: Article[] = [];       // 經過分類篩選後的文章
  public paginatedArticles: Article[] = [];      // 當前頁面要顯示的文章

  public currentPage = 1;
  public itemsPerPage = 9;
  public totalPages = 0;
  public paginationPages: (number | string)[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // 1. 從路由獲取所有文章
    this.allArticles = this.activatedRoute.snapshot.data['articlesInfo'] || [];

    // 2. 從所有文章中提取唯一的分類標籤
    this.setupCategories();

    // 3. 執行初始篩選和分頁 (預設顯示全部)
    this.applyFilterAndPagination();
  }

  /**
   * 遍歷所有文章，提取並去重所有標籤作為分類
   */
  private setupCategories(): void {
    const allTags = this.allArticles.flatMap(article => article.markdownData?.meta?.tags || []);
    this.categories = ['All', ...Array.from(new Set(allTags))]; // 'All' 作為第一個選項
  }

  /**
   * 處理用戶點擊分類的事件
   * @param category 被點擊的分類名稱, 或者 'All'
   */
  public selectCategory(category: string): void {
    this.activeCategory = category === 'All' ? null : category;
    this.applyFilterAndPagination();
  }

  /**
   * 核心方法：根據當前選中的分類篩選文章，然後設置分頁
   */
  private applyFilterAndPagination(): void {
    // 1. 篩選文章
    if (this.activeCategory) {
      this.filteredArticles = this.allArticles.filter(article =>
        article.markdownData?.meta?.tags?.includes(this.activeCategory!)
      );
    } else {
      this.filteredArticles = [...this.allArticles]; // 如果沒有選中分類，則顯示全部
    }

    // 2. 根據篩選結果重新計算分頁
    this.totalPages = Math.ceil(this.filteredArticles.length / this.itemsPerPage);
    this.goToPage(1); // 每次篩選後都重置到第一頁
  }

  /**
   * 跳轉到指定頁面 (此方法大部分不變，但現在基於 filteredArticles 操作)
   */
  public goToPage(page: number): void {
    // 確保總頁數大於0才進行跳轉
    if (this.totalPages === 0) {
        this.currentPage = 1;
        this.paginatedArticles = [];
        this.paginationPages = [];
        return;
    }

    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;

    // 更新分頁數據
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);

    this.generatePaginationControls();
    this.scrollToTop();
  }

  // nextPage, previousPage, generatePaginationControls, scrollToTop 等方法保持不變...
  // (為簡潔起見，此處省略，請保留你原有的這些輔助方法)
  public previousPage(): void { this.goToPage(this.currentPage - 1); }
  public nextPage(): void { this.goToPage(this.currentPage + 1); }
  private scrollToTop(): void { if (this.isBrowser) { window.scrollTo({ top: 0, behavior: 'smooth' }); } }
  private generatePaginationControls(): void {
    if (this.totalPages <= 1) {
      this.paginationPages = this.totalPages === 1 ? [1] : [];
      return;
    }
    const pagesToShow = new Set<number>();
    pagesToShow.add(1);
    pagesToShow.add(this.totalPages);
    for (let i = -1; i <= 1; i++) {
        const page = this.currentPage + i;
        if (page > 0 && page <= this.totalPages) {
            pagesToShow.add(page);
        }
    }
    const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);
    const result: (number | string)[] = [];
    let lastPage = 0;
    for (const page of sortedPages) {
        if (lastPage !== 0 && page - lastPage > 1) {
            result.push('...');
        }
        result.push(page);
        lastPage = page;
    }
    this.paginationPages = result;
  }
   /**
   * 為 *ngFor 提供 trackBy 函式以優化性能
   * @param index 項目索引
   * @param article 項目本身
   * @returns 用於追蹤的唯一標識符
   */
  public trackByArticleRoute(index: number, article: Article): string {
    return article.route; // 或者 article.markdownData?.meta?.title 等唯一值
  }
}
