import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common'; // 引入 CommonModule 或個別指令/管道

@Component({
  selector: 'app-flashcard-list',
  standalone: true, // <--- 設為 standalone
  imports: [
    CommonModule // 或 NgIf, NgForOf, DatePipe 等
  ], // <--- 引入依賴
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.css']
})
export class FlashcardListComponent {
  @Input() flashcards: Flashcard[] | null = [];
  @Output() editCard = new EventEmitter<Flashcard>();
  @Output() deleteCard = new EventEmitter<string>();

  constructor() {}

  onEdit(card: Flashcard): void {
    this.editCard.emit(card);
  }

  onDelete(cardId: string): void {
    if (confirm('確定要刪除這張卡片嗎?')) {
      this.deleteCard.emit(cardId);
    }
  }
}
