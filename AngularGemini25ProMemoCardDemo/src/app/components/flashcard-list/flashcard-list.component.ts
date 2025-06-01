import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common'; // 引入 CommonModule 或個別指令/管道

@Component({
  selector: 'app-flashcard-list',
  standalone: true, // <--- 設為 standalone
  imports: [
    CommonModule // 或 NgIf, NgForOf, DatePipe 等
  ], // <--- 引入依賴
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent {
  @Input() flashcards: Flashcard[] | null = [];
  filterFlashcards: Flashcard[] | null = [];
  searchTerm: string = '';
  @Output() editCard = new EventEmitter<Flashcard>();
  @Output() deleteCard = new EventEmitter<string>();

  constructor() {
    this.applyFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flashcards']) {
      this.applyFilter(); // 重新应用过滤
    }
  }

  onEdit(card: Flashcard): void {
    this.editCard.emit(card);
  }

  onDelete(cardId: string): void {
    if (confirm('確定要刪除這張卡片嗎?')) {
      this.deleteCard.emit(cardId);
    }
  }


  // 当搜索框内容改变时调用
  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (!this.flashcards) {
      this.filterFlashcards = []; // 或者 null，取决于你希望如何处理
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      // 如果没有搜索词，显示所有卡片 (创建副本以避免意外修改原始数组，尽管这里 filter 也会创建新数组)
      this.filterFlashcards = [...this.flashcards];
    } else {
      this.filterFlashcards = this.flashcards.filter(card =>
        card.answer.toLowerCase().includes(term) ||
        card.category.toLowerCase().includes(term)
        // 你可以根据需要添加更多搜索字段，例如 card.category.toLowerCase().includes(term)
      );
    }
    // console.log('Filtered cards:', this.filterFlashcards);
  }
}
