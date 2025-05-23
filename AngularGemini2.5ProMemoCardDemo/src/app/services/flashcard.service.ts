import { Injectable } from '@angular/core';
import { Flashcard } from '../models/flashcard.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  private readonly localStorageKey = 'flashcards';
  private flashcardsSubject = new BehaviorSubject<Flashcard[]>(this.loadFlashcards());
  flashcards$: Observable<Flashcard[]> = this.flashcardsSubject.asObservable();

  constructor() {}

  private loadFlashcards(): Flashcard[] {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      // 將字串日期轉換回 Date 物件
      return (JSON.parse(data) as Flashcard[]).map(card => ({
        ...card,
        lastAnsweredTime: card.lastAnsweredTime ? new Date(card.lastAnsweredTime) : null,
      }));
    }
    return [];
  }

  private saveFlashcards(cards: Flashcard[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cards));
    this.flashcardsSubject.next(cards);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  getFlashcards(): Flashcard[] {
    return this.flashcardsSubject.value;
  }

  getFlashcardById(id: string): Flashcard | undefined {
    return this.getFlashcards().find(card => card.id === id);
  }

  addFlashcard(cardData: Omit<Flashcard, 'id' | 'lastAnsweredTime' | 'answerCount' | 'score'>): void {
    const newCard: Flashcard = {
      ...cardData,
      id: this.generateId(),
      lastAnsweredTime: null,
      answerCount: 0,
      score: 0,
    };
    const cards = this.getFlashcards();
    this.saveFlashcards([...cards, newCard]);
  }

  updateFlashcard(updatedCard: Flashcard): void {
    let cards = this.getFlashcards();
    cards = cards.map(card => (card.id === updatedCard.id ? updatedCard : card));
    this.saveFlashcards(cards);
  }

  deleteFlashcard(id: string): void {
    let cards = this.getFlashcards();
    cards = cards.filter(card => card.id !== id);
    this.saveFlashcards(cards);
  }

  // 抽卡邏輯
  getNextCardToReview(): Flashcard | undefined {
    const cards = [...this.getFlashcards()]; // 複製一份來排序，不影響原陣列
    if (cards.length === 0) {
      return undefined;
    }

    cards.sort((a, b) => {
      // 1. 上次回答時間 (越早的越優先，null/undefined 表示未回答過，最優先)
      const timeA = a.lastAnsweredTime ? a.lastAnsweredTime.getTime() : -Infinity;
      const timeB = b.lastAnsweredTime ? b.lastAnsweredTime.getTime() : -Infinity;
      if (timeA !== timeB) {
        return timeA - timeB;
      }

      // 2. 回答次數 (越少的越優先)
      if (a.answerCount !== b.answerCount) {
        return a.answerCount - b.answerCount;
      }

      // 3. 分數 (越低的越優先)
      return a.score - b.score;
    });

    return cards[0];
  }

  // 回答卡片
  answerCard(cardId: string, knowsAnswer: boolean): void {
    const card = this.getFlashcardById(cardId);
    if (card) {
      card.lastAnsweredTime = new Date();
      card.answerCount++;
      if (knowsAnswer) {
        card.score += 1; // 會: 分數增加
      } else {
        card.score = Math.max(0, card.score - 2); // 不會: 分數減少，但不低於0 (或你想要的邏輯)
      }
      this.updateFlashcard(card);
    }
  }
}
