export interface Flashcard {
  id: string; // 唯一ID
  question: string;
  answer: string;
  category: string;
  lastAnsweredTime?: Date | null; // 上次回答時間 (可選)
  answerCount: number;
  score: number;
}
