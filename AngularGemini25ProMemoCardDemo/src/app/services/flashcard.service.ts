// src/app/services/flashcard.service.ts
import { Injectable } from '@angular/core';
import { Flashcard } from '../models/flashcard.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  private readonly localStorageKey = 'flashcards';
  private flashcardsSubject = new BehaviorSubject<Flashcard[]>(this.loadFlashcards());
  flashcards$: Observable<Flashcard[]> = this.flashcardsSubject.asObservable();

  constructor() {
    this.updateCategoryCache();
  }

  private loadFlashcards(): Flashcard[] {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      return (JSON.parse(data) as Flashcard[]).map(card => ({
        ...card,
        lastAnsweredTime: card.lastAnsweredTime ? new Date(card.lastAnsweredTime) : null,
      }));
    }
    return [];
  }

  private saveFlashcards(cards: Flashcard[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cards));
    this.flashcardsSubject.next(this.parseDates(cards)); // 確保發出的也是 Date 物件
  }

  private generateId(): string {
    // 保持原樣
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Helper to ensure dates are Date objects after potential JSON stringification/parsing
  private parseDates(cards: Flashcard[]): Flashcard[] {
    return cards.map(card => ({
      ...card,
      lastAnsweredTime: card.lastAnsweredTime ? new Date(card.lastAnsweredTime) : null,
    }));
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
      category: cardData.category,
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

  // 新增：用給定的卡片陣列完全替換本地卡片
  replaceAllFlashcards(newCards: Flashcard[]): void {
    // 從 Firebase 下載的資料，日期可能是 Timestamp，需要轉換
    const processedCards = newCards.map(card => {
      let lastAnsweredTime = null;
      if (card.lastAnsweredTime) {
        // @ts-ignore Firestore Timestamp to Date
        if (card.lastAnsweredTime.toDate) {
          // @ts-ignore
          lastAnsweredTime = card.lastAnsweredTime.toDate();
        } else if (typeof card.lastAnsweredTime === 'string' || typeof card.lastAnsweredTime === 'number') {
          lastAnsweredTime = new Date(card.lastAnsweredTime);
        } else {
          lastAnsweredTime = card.lastAnsweredTime; // 假設它已經是 Date
        }
      }
      return {
        ...card,
        lastAnsweredTime: lastAnsweredTime
      };
    });
    this.saveFlashcards(processedCards);
  }

  private cachedCategories: string[] = [];
  updateCategoryCache(): void {
    this.getAllCategories().subscribe(categories => {
      this.cachedCategories = categories;
    });
  }

  getNextCardToReview(): Flashcard | undefined {
    const categories = this.cachedCategories;
    const cards = this.getFlashcards().filter(card =>
      categories.includes(card.category)
    );

    if (cards.length === 0) {
      return undefined;
    }

    cards.sort((a, b) => {
      const timeA = this.calculateTime(a.lastAnsweredTime?.getTime());
      const timeB = this.calculateTime(b.lastAnsweredTime?.getTime());

      if(a.answerCount == 0) return -1;
      if(b.answerCount == 0) return -1;

      if(a.score == b.score) {
        if(b.answerCount == a.answerCount) return timeB.days - timeA.days;
        return b.answerCount - a.answerCount
      }

      return a.score - b.score;
    });

    console.log(cards)

    return cards[0];
  }

  /**
   * 計算經過時間
   * @param timestamp 時間差戳
   * @returns 時間差
   */
  calculateTime(timestamp: number | undefined, oClock: boolean = false): ElapsedTime {
    if (!timestamp) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const date = new Date();
    const startOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime();
    const currentTime = oClock ? startOfToday : Date.now();
    const timeDifference = Math.abs(currentTime - timestamp); // 計算時間差（取絕對值）

    // 轉換為相差的天數、小時和分鐘
    var days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    var hours = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    var minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));

    return {
      days: days,
      hours: hours,
      minutes: minutes,
    };
  }

  answerCard(cardId: string, knowsAnswer: boolean): void {
    // ... (保持原樣)
    const card = this.getFlashcardById(cardId);
    if (card) {
      card.lastAnsweredTime = new Date();
      card.answerCount++;
      if (knowsAnswer) {
        card.score += 1;
      } else {
        card.score = Math.max(0, card.score - 2);
      }
      this.updateFlashcard(card);
    }
  }

  // --- 類別管理 ---
  private readonly selectedCategoriesKey = 'selectedFlashcardCategories'; // 新增 key
  private selectedCategoriesSubject = new BehaviorSubject<string[]>(this.loadSelectedCategories()); // 新增類別 BehaviorSubject
  allFlashcards$: Observable<Flashcard[]> = this.flashcardsSubject.asObservable(); // 公開的 Observable，讓外部可以訂閱所有卡片
  selectedCategories$: Observable<string[]> = this.selectedCategoriesSubject.asObservable(); // 公開的 Observable，讓外部可以訂閱當前選擇的類別

  private loadSelectedCategories(): string[] {
    const data = localStorage.getItem(this.selectedCategoriesKey);
    return data ? JSON.parse(data) : []; // 預設不選中任何類別，或者您可以設為 ['預設']
  }

  setSelectedCategories(categories: string[]): void {
    localStorage.setItem(this.selectedCategoriesKey, JSON.stringify(categories));
    this.selectedCategoriesSubject.next(categories);
  }

  getAllCategories(): Observable<string[]> {
    return this.allFlashcards$.pipe(
      map(cards => {
        const categories = new Set<string>();
        cards.forEach(card => categories.add(card.category));
        return Array.from(categories).sort();
      })
    );
  }
}

export class ElapsedTime {
  days: number = 0; hours: number = 0; minutes: number = 0;
}
