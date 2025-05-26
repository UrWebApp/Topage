import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Flashcard } from './models/flashcard.model';
import { FlashcardService } from './services/flashcard.service';
import { Observable } from 'rxjs';
import { FlashcardFormComponent } from './components/flashcard-form/flashcard-form.component';
import { FlashcardListComponent } from './components/flashcard-list/flashcard-list.component';
import { FlashcardReviewComponent } from './components/flashcard-review/flashcard-review.component';
import { FirebaseSyncModalComponent } from './components/firebase-sync-modal/firebase-sync-modal.component'; // <--- 引入

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FlashcardFormComponent,
    FlashcardListComponent,
    FlashcardReviewComponent,
    FirebaseSyncModalComponent // <--- 加入 imports
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MemoCard';
  flashcards$: Observable<Flashcard[]>;
  showForm = false;
  cardToEdit: Flashcard | null = null;
  currentView: 'list' | 'review' = 'list';

  isFirebaseSyncModalOpen = false; // <--- 新增狀態

  constructor(private flashcardService: FlashcardService) {
    this.flashcards$ = this.flashcardService.flashcards$;
  }

  ngOnInit(): void { }

  toggleView(view: 'list' | 'review'): void {
    // ... (保持原樣)
    this.currentView = view;
    if (view === 'list') {
      this.showForm = false;
      this.cardToEdit = null;
    }
  }

  openAddForm(): void {
    // ... (保持原樣)
    this.cardToEdit = null;
    this.showForm = true;
    this.currentView = 'list';
    this.goToAnchor(this.headerDOM);
  }

  openEditForm(card: Flashcard): void {
    // ... (保持原樣)
    this.cardToEdit = card;
    this.showForm = true;
    this.currentView = 'list';
    this.goToAnchor(this.headerDOM);
  }

  @ViewChild('header', { static: false }) headerDOM!: ElementRef;
  /**
 * 滾動到特定的 HTML 元素
 * @param elementRef - 要滾動到的元素的 ElementRef
 */
  goToAnchor(elementRef: ElementRef): void {
    // 使用 scrollIntoView 方法滾動到指定的元素
    elementRef.nativeElement.scrollIntoView({
      // 使用平滑滾動效果
      behavior: 'smooth',
      // 將元素的開始位置滾動到視圖的開始位置
      block: 'start',
      // 將元素的開始邊緣對齊視圖的開始邊緣
      inline: 'start',
    });
  }

  handleFormSubmit(cardData: Omit<Flashcard, 'id' | 'lastAnsweredTime' | 'answerCount' | 'score'> | Flashcard): void {
    // ... (保持原樣)
    if ('id' in cardData) {
      this.flashcardService.updateFlashcard(cardData as Flashcard);
    } else {
      this.flashcardService.addFlashcard(cardData as Omit<Flashcard, 'id' | 'lastAnsweredTime' | 'answerCount' | 'score'>);
    }
    this.showForm = false;
    this.cardToEdit = null;
  }

  handleFormCancel(): void {
    // ... (保持原樣)
    this.showForm = false;
    this.cardToEdit = null;
  }

  handleDeleteCard(cardId: string): void {
    // ... (保持原樣)
    this.flashcardService.deleteFlashcard(cardId);
  }

  // 新增方法來控制 Firebase 同步彈跳窗
  openFirebaseSyncModal(): void {
    this.isFirebaseSyncModalOpen = true;
  }

  closeFirebaseSyncModal(): void {
    this.isFirebaseSyncModalOpen = false;
  }
}
