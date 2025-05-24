import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // 引入 ReactiveFormsModule
import { Flashcard } from '../../models/flashcard.model';
import { CommonModule } from '@angular/common'; // 為了 *ngIf

import { CategorySelectorComponent } from '../category-selector/category-selector.component';

@Component({
  selector: 'app-flashcard-form',
  standalone: true, // <--- 設為 standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategorySelectorComponent
  ], // <--- 引入依賴
  templateUrl: './flashcard-form.component.html',
  styleUrls: ['./flashcard-form.component.css']
})
export class FlashcardFormComponent implements OnInit, OnChanges {
  @Input() cardToEdit: Flashcard | null = null;
  @Output() formSubmitted = new EventEmitter<Omit<Flashcard, 'id' | 'lastAnsweredTime' | 'answerCount' | 'score'> | Flashcard>();
  @Output() cancel = new EventEmitter<void>();

  cardForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardToEdit']) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.cardToEdit) {
      this.isEditing = true;
      this.cardForm.patchValue({
        question: this.cardToEdit.question,
        answer: this.cardToEdit.answer,
        category: this.cardToEdit.category
      });
    } else {
      this.isEditing = false;
      this.cardForm.reset();
    }
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      const formData = this.cardForm.value;
      if (this.isEditing && this.cardToEdit) {
        const updatedCard: Flashcard = {
          ...this.cardToEdit,
          question: formData.question,
          answer: formData.answer,
          category: formData.category
        };
        this.formSubmitted.emit(updatedCard);
      } else {
        this.formSubmitted.emit(formData);
      }
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
