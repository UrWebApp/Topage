import { Component, OnInit } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { TtsService } from '../../services/tts.service';
import { CommonModule, NgIf } from '@angular/common'; // 引入 CommonModule 或 NgIf
import { TtsSettingsModalComponent } from '../tts-settings-modal/tts-settings-modal.component';

@Component({
  selector: 'app-flashcard-review',
  standalone: true, // <--- 設為 standalone
  imports: [
    CommonModule, // 或 NgIf
    TtsSettingsModalComponent
  ], // <--- 引入依賴
  templateUrl: './flashcard-review.component.html',
  styleUrls: ['./flashcard-review.component.css']
})
export class FlashcardReviewComponent implements OnInit {
  currentCard: Flashcard | undefined = undefined;
  showAnswer: boolean = false;
  isTtsSettingsModalOpen = false;

  constructor(
    private flashcardService: FlashcardService,
    public ttsService: TtsService
  ) {}

  ngOnInit(): void {
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
}
