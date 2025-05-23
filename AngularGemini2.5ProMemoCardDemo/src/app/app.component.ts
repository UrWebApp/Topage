import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common'; // 引入 CommonModule 或個別指令/管道
import { Flashcard } from './models/flashcard.model';
import { FlashcardService } from './services/flashcard.service';
import { Observable } from 'rxjs';
import { FlashcardFormComponent } from './components/flashcard-form/flashcard-form.component';
import { FlashcardListComponent } from './components/flashcard-list/flashcard-list.component';
import { FlashcardReviewComponent } from './components/flashcard-review/flashcard-review.component';

@Component({
  selector: 'app-root',
  standalone: true, // <--- 設為 standalone
  imports: [
    CommonModule, // 或 NgIf, AsyncPipe 等個別導入
    FlashcardFormComponent,
    FlashcardListComponent,
    FlashcardReviewComponent
  ], // <--- 引入依賴
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '單字卡應用程式 (Standalone)';
  flashcards$: Observable<Flashcard[]>;
  showForm = false;
  cardToEdit: Flashcard | null = null;
  currentView: 'list' | 'review' = 'list';

  constructor(private flashcardService: FlashcardService) {
    this.flashcards$ = this.flashcardService.flashcards$;
  }

  ngOnInit(): void {}

  toggleView(view: 'list' | 'review'): void {
    this.currentView = view;
    if (view === 'list') {
        this.showForm = false;
        this.cardToEdit = null;
    }
  }

  openAddForm(): void {
    this.cardToEdit = null;
    this.showForm = true;
    this.currentView = 'list';
  }

  openEditForm(card: Flashcard): void {
    this.cardToEdit = card;
    this.showForm = true;
    this.currentView = 'list';
  }

  handleFormSubmit(cardData: Omit<Flashcard, 'id' | 'lastAnsweredTime' | 'answerCount' | 'score'> | Flashcard): void {
    if ('id' in cardData) {
      this.flashcardService.updateFlashcard(cardData as Flashcard);
    } else {
      this.flashcardService.addFlashcard(cardData as Omit<Flashcard, 'id' | 'lastAnsweredTime' | 'answerCount' | 'score'>);
    }
    this.showForm = false;
    this.cardToEdit = null;
  }

  handleFormCancel(): void {
    this.showForm = false;
    this.cardToEdit = null;
  }

  handleDeleteCard(cardId: string): void {
    this.flashcardService.deleteFlashcard(cardId);
  }
}
