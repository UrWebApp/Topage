import { Component, OnInit } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { TtsService } from '../../services/tts.service';
import { CommonModule, NgIf } from '@angular/common'; // 引入 CommonModule 或 NgIf
import { TtsSettingsModalComponent } from '../tts-settings-modal/tts-settings-modal.component';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-flashcard-review',
  standalone: true, // <--- 設為 standalone
  imports: [
    CommonModule, // 或 NgIf
    FormsModule,
    TtsSettingsModalComponent
  ], // <--- 引入依賴
  templateUrl: './flashcard-review.component.html',
  styleUrls: ['./flashcard-review.component.css']
})
export class FlashcardReviewComponent implements OnInit {
  currentCard: Flashcard | undefined = undefined;
  showAnswer: boolean = false;
  isTtsSettingsModalOpen = false;

  allCategories$: Observable<string[]> = of([]);;
  selectedCategories: string[] = []; // 用於綁定下拉選單

  constructor(
    public flashcardService: FlashcardService,
    public ttsService: TtsService
  ) {
    this.allCategories$ = this.flashcardService.getAllCategories();
  }

  ngOnInit(): void {
    // 從服務中獲取上次選擇的類別
    this.flashcardService.selectedCategories$.subscribe(categories => {
      this.selectedCategories = [...(categories || [])]; // 確保是新的陣列副本以觸發變更檢測
    });
    this.drawNextCard();
  }

  drawNextCard(): void {
    this.currentCard = this.flashcardService.getNextCardToReview();
    this.showAnswer = false;
  }

  revealAnswer(): void {
    this.showAnswer = true;
  }

  speakAnswer(): void {
    if (this.currentCard && this.currentCard.answer) {
      this.ttsService.speak(this.currentCard.answer);
    }
  }

  answer(knows: boolean): void {
    if (this.currentCard) {
      this.flashcardService.answerCard(this.currentCard.id, knows);
      this.drawNextCard();
    }
  }

  openTtsSettings(): void {
    this.isTtsSettingsModalOpen = true;
  }

  closeTtsSettings(): void {
    this.isTtsSettingsModalOpen = false;
  }

  // 當類別選擇變更時
  onCategorySelectionChange(): void {
    console.log('onCategorySelectionChange',this.selectedCategories)
    this.flashcardService.setSelectedCategories(this.selectedCategories);
    this.drawNextCard(); // 重新抽卡
  }

  // 全選/取消全選
  toggleSelectAllCategories(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.allCategories$.subscribe(allCats => {
        this.selectedCategories = [...allCats];
        this.onCategorySelectionChange();
      }).unsubscribe(); // 立即取消訂閱，因為我們只需要一次值
    } else {
      this.selectedCategories = [];
      this.onCategorySelectionChange();
    }
  }

  // 檢查是否所有類別都被選中 (用於 "全選" checkbox 的狀態)
  areAllCategoriesSelected(): boolean {
    let allCatsLength = 0;
    this.allCategories$.subscribe(cats => allCatsLength = cats.length).unsubscribe();
    return allCatsLength > 0 && this.selectedCategories.length === allCatsLength;
  }
}
