import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; // ControlValueAccessor, NG_VALUE_ACCESSOR
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css'],
  providers: [ // <--- 為了 ControlValueAccessor
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectorComponent),
      multi: true
    }
  ]
})
export class CategorySelectorComponent implements OnInit, OnChanges, ControlValueAccessor { // <--- 實現 ControlValueAccessor

  @Input() predefinedCategories: string[] = [];
  // initialCategory 仍然可以作為一個普通的 @Input，用於非表單場景或設定初始預設值
  // 但在表單中，writeValue 將會是主要的值設定方式
  @Input() initialCategory: string | null = null;
  @Input() placeholder: string = '選擇或新增類別';
  @Input() addNewOptionText: string = '＋ 新增自定義類別...';
  @Input() localStorageKey: string = 'appUserCustomCategories';

  @Output() categorySelected = new EventEmitter<string>(); // 這個仍然可以保留，供非表單使用或額外邏輯

  // 內部狀態
  displayCategories: string[] = [];
  selectedInternalCategory: string | null = null;
  isCustomInputVisible: boolean = false;
  customCategoryValue: string = '';
  private userCustomCategories: string[] = [];
  public readonly ADD_NEW_OPTION_VALUE = '__ADD_NEW_CATEGORY__';

  // ControlValueAccessor 相關屬性和方法
  private onChange: (value: string | null) => void = () => {};
  public onTouched: () => void = () => {};
  public isDisabled: boolean = false;

  constructor() { }

  // --- ControlValueAccessor 接口實現 ---
  writeValue(value: string | null): void {
    // 當表單模型的值改變時，Angular 會調用此方法
    // 我們需要確保如果 value 是一個新的自定義值，它能被選中
    if (value &&
        value !== this.ADD_NEW_OPTION_VALUE &&
        !this.predefinedCategories.includes(value) &&
        !this.userCustomCategories.includes(value) &&
        !this.displayCategories.includes(value)) {
        // 如果表單給了一個全新的值，臨時將其加入 displayCategories 以便 <select> 能顯示它
        // 這不會將其存儲到 localStorage，除非用戶通過 UI 確認
        const addNewIndex = this.displayCategories.indexOf(this.ADD_NEW_OPTION_VALUE);
        if (addNewIndex > -1) {
            this.displayCategories.splice(addNewIndex, 0, value);
        } else {
            this.displayCategories.push(value); // Fallback
        }
    }
    this.selectedInternalCategory = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn; // 保存 Angular 提供的回調，當元件內部值改變時調用它
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn; // 保存 Angular 提供的回調，當元件被視為 "touched" 時調用它
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // 當表單控件的禁用狀態改變時調用
  }

  // --- 生命週期鉤子 ---
  ngOnInit(): void {
    this.loadUserCustomCategoriesFromLocalStorage();
    this.buildDisplayOptions();
    // 如果 initialCategory 存在且表單尚未提供值 (selectedInternalCategory 仍為 null), 則使用 initialCategory
    if (this.initialCategory && this.selectedInternalCategory === null) {
      this.writeValue(this.initialCategory); // 使用 writeValue 來設定，確保一致性
    } else if (this.selectedInternalCategory === null) {
      // 如果沒有初始值，確保 placeholder 被選中
      this.selectedInternalCategory = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let rebuildOptions = false;
    let reselectInitial = false;

    if (changes['predefinedCategories']) {
      rebuildOptions = true;
    }
    if (changes['localStorageKey']) {
      this.loadUserCustomCategoriesFromLocalStorage();
      rebuildOptions = true;
    }
     // 如果 initialCategory 改變，並且 selectedInternalCategory 仍然是其初始狀態 (可能為 null)
     // 則更新 selectedInternalCategory
    if (changes['initialCategory'] && (this.selectedInternalCategory === null || this.selectedInternalCategory === changes['initialCategory'].previousValue) ) {
        reselectInitial = true;
    }


    if (rebuildOptions) {
      this.buildDisplayOptions();
    }

    // 當 predefinedCategories 或 initialCategory 改變時，重新評估選擇
    if (rebuildOptions || reselectInitial) {
        // 如果表單已經設定了值 (selectedInternalCategory 不是 null)，則優先使用表單的值
        // 否則，如果 initialCategory 改變了，嘗試設定它
        if (this.selectedInternalCategory === null && changes['initialCategory']) {
             this.writeValue(this.initialCategory);
        } else if (this.selectedInternalCategory !== null) {
            // 確保當前 selectedInternalCategory 仍然有效
             this.writeValue(this.selectedInternalCategory); // Re-evaluate with current form value
        }
    }


    // 如果當前選中的類別 (不是 "新增" 選項) 不再是有效選項，則可能需要重置
    if (
      this.selectedInternalCategory &&
      this.selectedInternalCategory !== this.ADD_NEW_OPTION_VALUE &&
      !this.displayCategories.includes(this.selectedInternalCategory)
    ) {
      // 檢查它是否也不是 predefinedCategories 或 userCustomCategories 的一部分
      if (!this.predefinedCategories.includes(this.selectedInternalCategory) &&
          !this.userCustomCategories.includes(this.selectedInternalCategory)) {
        // 如果表單中的值不再有效，則清空它
        this.writeValue(null);
        this.onChange(null); // 通知表單
      }
    }
  }

  // --- LocalStorage 相關 (與之前版本相同) ---
  private loadUserCustomCategoriesFromLocalStorage(): void {
    try {
      const storedCategories = localStorage.getItem(this.localStorageKey);
      this.userCustomCategories = storedCategories ? JSON.parse(storedCategories) : [];
    } catch (e) {
      console.error(`Error loading categories from localStorage (key: ${this.localStorageKey})`, e);
      this.userCustomCategories = [];
    }
  }

  private saveUserCustomCategoriesToLocalStorage(): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.userCustomCategories));
    } catch (e) {
      console.error(`Error saving categories to localStorage (key: ${this.localStorageKey})`, e);
    }
  }

  private buildDisplayOptions(): void {
    const allCategorySet = new Set([
      ...this.predefinedCategories,
      ...this.userCustomCategories
    ]);
    this.displayCategories = Array.from(allCategorySet)
                                  .filter(cat => cat !== this.ADD_NEW_OPTION_VALUE);
    this.displayCategories.push(this.ADD_NEW_OPTION_VALUE);

    // 如果 selectedInternalCategory 是一個不在新 displayCategories 中的值 (可能是舊的自定義值被刪除)
    // 並且它不是 ADD_NEW_OPTION_VALUE，則重置選擇
    if (this.selectedInternalCategory &&
        !this.displayCategories.includes(this.selectedInternalCategory) &&
        this.selectedInternalCategory !== this.ADD_NEW_OPTION_VALUE) {
        // this.writeValue(null); // 交給 ngOnChanges 或外部邏輯處理
    }
  }

  // --- 事件處理 ---
  onSelectionChange(event: Event | string): void {
    let selectedValue: string | null;
    if (typeof event === 'string') {
        selectedValue = event;
    } else {
        selectedValue = (event.target as HTMLSelectElement).value;
    }
    if (selectedValue === 'null') {
        selectedValue = null;
    }

    this.selectedInternalCategory = selectedValue; // 更新內部 <select> 綁定的值

    if (selectedValue === this.ADD_NEW_OPTION_VALUE) {
      this.isCustomInputVisible = true;
      this.customCategoryValue = '';
      this.onTouched(); // 用戶打開了自定義輸入，視為 touched
    } else { // selectedValue 可以是 string 或 null (如果 placeholder 被選中)
      this.isCustomInputVisible = false;
      this.categorySelected.emit(selectedValue as string); // 發出舊的 Output 事件
      this.onChange(selectedValue); // <-- 通知表單模型值的改變
      this.onTouched(); // <-- 通知表單該控件已被 touched
    }
  }

  confirmCustomCategory(): void {
    const newCategory = this.customCategoryValue.trim();
    if (newCategory && newCategory !== this.ADD_NEW_OPTION_VALUE) {
      if (!this.predefinedCategories.includes(newCategory) && !this.userCustomCategories.includes(newCategory)) {
        this.userCustomCategories.push(newCategory);
        this.saveUserCustomCategoriesToLocalStorage();
      }
      this.buildDisplayOptions();
      this.selectedInternalCategory = newCategory; // 更新內部 <select> 綁定的值
      this.categorySelected.emit(newCategory);
      this.onChange(newCategory); // <-- 通知表單模型值的改變
      this.onTouched(); // <-- 通知表單該控件已被 touched
      this.isCustomInputVisible = false;
      this.customCategoryValue = '';
    } else if (!newCategory) {
      this.isCustomInputVisible = false;
    }
  }

  cancelCustomCategory(): void {
    this.isCustomInputVisible = false;
    this.customCategoryValue = '';
    if (this.selectedInternalCategory === this.ADD_NEW_OPTION_VALUE) {
      this.selectedInternalCategory = null; // 重置 <select> 到 placeholder
      this.onChange(null); // <-- 通知表單模型值的改變 (變成 null)
    }
    this.onTouched(); // <-- 通知表單該控件已被 touched
  }

  get deletableUserCustomCategories(): string[] {
    return this.userCustomCategories.filter(cat => !this.predefinedCategories.includes(cat));
  }

  deleteUserCustomCategory(categoryToDelete: string): void {
    const wasSelected = this.selectedInternalCategory === categoryToDelete;
    this.userCustomCategories = this.userCustomCategories.filter(cat => cat !== categoryToDelete);
    this.saveUserCustomCategoriesToLocalStorage();
    this.buildDisplayOptions();

    if (wasSelected) {
      this.selectedInternalCategory = null; // 清空選擇
      this.onChange(null); // <-- 通知表單模型值的改變
    }
    this.onTouched(); // <-- 通知表單該控件已被 touched
  }
}
