import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- 引入 FormsModule
import {
  Auth,
  createUserWithEmailAndPassword, // <--- 新增
  signInWithEmailAndPassword,     // <--- 新增
  signOut,
  User,
  onAuthStateChanged,
  Unsubscribe
} from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, writeBatch, query, setDoc, Timestamp } from '@angular/fire/firestore';
import { FlashcardService } from '../../services/flashcard.service';
import { Flashcard } from '../../models/flashcard.model';

@Component({
  selector: 'app-firebase-sync-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // <--- 加入 FormsModule 到 imports
  ],
  templateUrl: './firebase-sync-modal.component.html',
  styleUrls: ['./firebase-sync-modal.component.css']
})
export class FirebaseSyncModalComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private flashcardService: FlashcardService = inject(FlashcardService);

  user: User | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;

  // 用於 Email/Password 表單
  email = '';
  password = '';
  isRegisterMode = false; // 切換登入/註冊模式

  private authUnsubscribe!: Unsubscribe;

  ngOnInit(): void {
    this.authUnsubscribe = onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      if (user) {
        this.email = user.email || ''; // 如果已登入，可以預填 email
        this.successMessage = `已登入為: ${user.email}`;
        this.error = null;
      } else {
        this.email = '';
        this.password = '';
        // this.successMessage = null; // 登出時清除成功訊息
        // this.error = null; // 登出時清除錯誤訊息
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }
  }

  toggleAuthMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.error = null;
    this.successMessage = null;
    this.password = ''; // 切換模式時清空密碼
  }

  async handleAuthAction(): Promise<void> {
    if (!this.email || !this.password) {
      this.error = '請輸入電子郵件和密碼。';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    try {
      if (this.isRegisterMode) {
        // 註冊
        const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
        this.user = userCredential.user;
        this.successMessage = '帳戶註冊成功並已登入！';
      } else {
        // 登入
        const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
        this.user = userCredential.user;
        this.successMessage = '登入成功！';
      }
      this.password = ''; // 成功後清空密碼欄位
    } catch (e: any) {
      console.error(e);
      switch (e.code) {
        case 'auth/invalid-email':
          this.error = '無效的電子郵件格式。';
          break;
        case 'auth/user-disabled':
          this.error = '此帳戶已被禁用。';
          break;
        case 'auth/user-not-found':
          this.error = '找不到此電子郵件對應的帳戶。';
          break;
        case 'auth/wrong-password':
          this.error = '密碼錯誤。';
          break;
        case 'auth/email-already-in-use':
          this.error = '此電子郵件已被註冊。';
          break;
        case 'auth/weak-password':
          this.error = '密碼強度不足，至少需要6個字元。';
          break;
        default:
          this.error = `操作失敗: ${e.message}`;
      }
    } finally {
      this.isLoading = false;
    }
  }


  async logout(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    // this.successMessage = null; // 保留登入成功的訊息直到下次操作
    try {
      await signOut(this.auth);
      this.successMessage = '登出成功！'; // 登出成功後再更新
      this.email = ''; // 清空表單
      this.password = '';
      this.isRegisterMode = false; // 重置為登入模式
    } catch (e: any) {
      console.error(e);
      this.error = '登出失敗: ' + e.message;
    } finally {
      this.isLoading = false;
    }
  }

  // uploadToFirebase 和 downloadFromFirebase 方法保持不變
  async uploadToFirebase(): Promise<void> {
    if (!this.user) {
      this.error = '請先登入。';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    try {
      const localFlashcards = this.flashcardService.getFlashcards();
      if (localFlashcards.length === 0) {
        this.successMessage = '本地沒有卡片可上傳。';
        this.isLoading = false;
        // 可選：如果希望在本地卡片為空時清空雲端
        // await this.clearFirebaseData(this.user.uid);
        // this.successMessage = '本地沒有卡片可上傳。雲端資料已清空 (如果存在)。';
        return;
      }

      const batch = writeBatch(this.firestore);
      const userFlashcardsCol = collection(this.firestore, `users/${this.user.uid}/flashcards`);

      const existingDocsSnapshot = await getDocs(query(userFlashcardsCol));
      existingDocsSnapshot.forEach(docSnap => {
        batch.delete(docSnap.ref);
      });

      localFlashcards.forEach(card => {
        const cardRef = doc(userFlashcardsCol, card.id);
        const cardDataForFirebase: any = { ...card };
        if (cardDataForFirebase.lastAnsweredTime) {
          cardDataForFirebase.lastAnsweredTime = Timestamp.fromDate(new Date(cardDataForFirebase.lastAnsweredTime));
        }
        batch.set(cardRef, cardDataForFirebase);
      });

      await batch.commit();
      this.successMessage = `成功上傳 ${localFlashcards.length} 張卡片到雲端！`;
    } catch (e: any) {
      console.error(e);
      this.error = '上傳失敗: ' + e.message;
    } finally {
      this.isLoading = false;
    }
  }

  async downloadFromFirebase(): Promise<void> {
    if (!this.user) {
      this.error = '請先登入。';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    try {
      const userFlashcardsCol = collection(this.firestore, `users/${this.user.uid}/flashcards`);
      const q = query(userFlashcardsCol);
      const snapshot = await getDocs(q);

      const firebaseFlashcards: Flashcard[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        let lastAnsweredTime = null;
        if (data['lastAnsweredTime'] && data['lastAnsweredTime'].toDate) {
            lastAnsweredTime = data['lastAnsweredTime'].toDate();
        } else if (data['lastAnsweredTime']) {
            lastAnsweredTime = new Date(data['lastAnsweredTime']);
        }

        firebaseFlashcards.push({
            id: docSnap.id,
            question: data['question'],
            answer: data['answer'],
            category: data['category'],
            answerCount: data['answerCount'],
            score: data['score'],
            lastAnsweredTime: lastAnsweredTime
        } as Flashcard);
      });

      if (firebaseFlashcards.length === 0) {
        this.successMessage = '雲端沒有卡片可下載。本地資料未變更。';
        this.isLoading = false;
        return;
      }

      this.flashcardService.replaceAllFlashcards(firebaseFlashcards);
      this.successMessage = `成功從雲端下載並同步 ${firebaseFlashcards.length} 張卡片！`;

    } catch (e: any) {
      console.error(e);
      this.error = '下載失敗: ' + e.message;
    } finally {
      this.isLoading = false;
    }
  }


  onClose(): void {
    this.closeModal.emit();
  }
}
