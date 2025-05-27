# AngularGemini25ProMemoCardDemo

## 心得

除了第一版 prompt 描述較為簡單的版本非常驚豔，能透過後續新增 prompt 新增功能外，其餘版本皆有問題...，光修復就搞半天，更何況需求有點不符合，這還是新專案的狀況下，或許如果是用上下文是整個專案的 AI 工具會改善很多。

## 第一版 Prompt

請幫我產生一個單字卡 app 使用 angular

1. 需要有 本地紀錄、新增、刪除、修改 單字卡，欄位包含 ( 題目、答案、上次回答時間、回答次數、分數 )
2. 抽卡功能 依照 最近的回答時間、最少的回答次數、最低的分數 排序卡片並抽出顯示第一張
3. 回答功能 可以根據使用者的想法 回答( 會或不會 ) 增加或降低分數，並更新上次回答時間、回答次數
4. 需要有按鈕能透過 web 自帶的功能念出答案，並且有彈跳窗可以控制語音大小或聲音國籍

- 延伸 Prompt

1. 請改成 standalone 版本
2. 請再新增一個彈跳窗，幫我隨時可以針對 localStorage 進行 firebase "@angular/fire": "18.0.1", 的登入與上傳 localStorage  與下載 localStorage  同步卡片資料
3. 移除匿名登入，要由 EMAIL 與密碼登入
4. Flashcard 新增類別屬性，並同步新增與修改頁面
5. 新增類別勾選下拉選單，並記錄在 Localstage
6. 依照類別勾選下拉選單所勾選項目抽取卡片

## 後續 Prompt 

請幫我產生一個單字卡 app 使用 angular standalone scss

1. 請符合 apple 或 google 應用程式 uiux，主要分為抽卡介面、清單介面( 編輯卡片、同步卡片 )、編輯介面，依照 UIUX 提供彈跳窗或頁籤分頁，並且將能共用的如彈跳窗抽為共用元件，符合 apple 或 google 元子化開發理念
2. 卡片需要有 本地紀錄、新增、刪除、修改 單字卡，欄位包含 ( 題目、答案、類別[以現有的類別優先並提供自定義方式]、上次回答時間、回答次數、分數 )
3. 類別塞選：以現有的卡片類別，統一塞選出類別並預設一個全部選項，依照類別提供多選選項供抽卡功能塞選
4. 抽卡功能：依照選取的類別多選菜單塞選卡片(沒選擇的則不再排序範圍內)，然後依照最近的回答時間、最少的回答次數、最低的分數 排序卡片並抽出顯示第一張
5. 答題功能：可以根據使用者的想法 回答( 會或不會 ) 增加或降低分數，並更新上次回答時間、回答次數
6. 需要有按鈕能透過 web 自帶的功能念出答案，並且有彈跳窗可以控制語音大小或聲音國籍
7. 提供針對本地紀錄進行 firebase "@angular/fire": "18.0.1", 的 email 登入與上傳 本地紀錄與下載本地紀錄同步卡片資料

## 專案結構

```
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── flashcard-form/       # 新增/編輯表單
│   │   │   │   ├── flashcard-form.component.html
│   │   │   │   ├── flashcard-form.component.ts
│   │   │   │   └── flashcard-form.component.css
│   │   │   ├── flashcard-list/       # 卡片列表
│   │   │   │   ├── flashcard-list.component.html
│   │   │   │   ├── flashcard-list.component.ts
│   │   │   │   └── flashcard-list.component.css
│   │   │   ├── flashcard-review/     # 抽卡與回答
│   │   │   │   ├── flashcard-review.component.html
│   │   │   │   ├── flashcard-review.component.ts
│   │   │   │   └── flashcard-review.component.css
│   │   │   └── tts-settings-modal/ # 語音設定彈窗
│   │   │       ├── tts-settings-modal.component.html
│   │   │       ├── tts-settings-modal.component.ts
│   │   │       └── tts-settings-modal.component.css
│   │   ├── models/
│   │   │   └── flashcard.model.ts    # 單字卡資料模型
│   │   ├── services/
│   │   │   ├── flashcard.service.ts  # 單字卡邏輯服務
│   │   │   └── tts.service.ts        # 文字轉語音服務
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.component.css
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
...
```
