# AngularNgrxDemo

> NgRx v19 與 Angular v16+ 相容

- Action Group + Feature Creator：使用 createActionGroup 搭配 emptyProps/props，並透過 createFeature 同時定義 initialState、自動產生對應 selectors。
- Effects 類別式或函數式：可在類別中以 inject() + createEffect() 寫法，或選擇更輕量的函數式 Effects。
- Standalone API：以 provideStore、provideState、provideEffects 取代在 AppModule 手動註冊 Module。
- Selector Signal 整合：使用 selectSignal 同時支援從 Store 拿 Observable 與 Angular Signal。
- Immutable + 純函數：Reducer 必須為純函數且不可變更原始 state，以維持預測性與效能優化。

| 概念 | NgRx | Redux |
| ----- | ----- | ----- |
|  | Angular 用的 Redux 實作，整合 RxJS，幫助你管理全域狀態 | 通用的狀態管理模型，概念被很多框架（Vuex、NgRx...）採用 |
| ⬇ 流程起始 | 程式 ( 元件、服務、管道 etc... ) 觸發定義的 action, 訂閱 selector 取得資料 | 訂閱 store（connect or hooks） |
| ⬇ Action | 單純事件描述, 關聯事件名稱與資料或指令, 透過 createAction() 或 createActionGroup() | 單純事件描述 |
| ⬇ Middleware `原生 Redux 沒有` (可選) | Effect 包了一層運用 RxJS 流，處理副作用 ( ex: API 呼叫、router redirect) ——→ dispatch 成功或失敗 action；createEffect() | 社群提供的 middleware => redux-thunk / redux-saga |
| ⬇ Reducer | `純函數`將 action 與資料綁定並增加此狀態的狀態 ex：已下載、下載中...，`不應該`改變原本傳入的 state ( 位址會導致其他地方改變 )；createReducer() | 處理狀態變更 ( 純函數，計算新狀態 ) |
| ⬇ Selector `原生 Redux 沒有` | 元件利用 Rxjs 訂閱 Selector 內的 State，擴充了`記憶化` ( 參數沒變就傳上次 ) / `組合式` ( 多個 selector 組成新的一個 ) | React-Redux 官方推薦的外部套件 useSelector() |
| ⬇ State | 全域 Store (RxJS) observable 狀態容器 | 管理全域狀態 ( 純資料物件 ) |
| 語法風格 | Angular + RxJS + TypeScript | 純函數 + Immutable |
| 使用框架 | 只支援 Angular（專門設計） | 任意（多見於 React） |

- Side Effect：當一個函數 除了回傳結果以外，還對外部世界做了事情；影響 DOM、發 API 請求、輸出紀錄、localStorage、session、setTimeout、setInterval、改變變數、window.location、router push
- Immutable：一旦資料被建立，就不能被修改，想改只能建立一個新的資料副本
- `純函數`：同樣輸入 → 永遠得到同樣輸出，不改外部的東西、沒有副作用

```
function add(a, b) {
  return a + b; 🎯
}

add(1, 2); // 一定回傳 3

///////////////////////////////////////////

function addWithSideEffect(a) {
  count++; // ❌ 改變了外部變數
  return a + count;
}


addWithSideEffect(1); // 第一次：2
addWithSideEffect(1); // 第二次：3，結果變了
```
