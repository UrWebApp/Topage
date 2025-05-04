// 使用 createActionGroup 提供統一前綴與型別安全

import {
  createActionGroup,
  emptyProps, // createActionGroup 相對於舊的 createAction 無 payload 的純事件 action 一定要掛 emptyProps
  props // 讓你的 action 不只是發出「事件」，還能帶資料，並且支援 TypeScript 型別推導
} from '@ngrx/store';
import { User } from '../user.store.service';

export const UserActions = createActionGroup({
  source: 'User', // action type prefix 幫助辨認 action 屬於的功能模組
  events: { // 定義 action 名稱與 payload 結構
    'Load Users': emptyProps(), // type: '[User] Load Users'; 純事件型 action 定義一個不帶 payload 的 action（就是只發出 action 來觸發 effect、reducer 等）
    'Load Users Success': props<{ users: User[] }>(), //  type: '[User] Load Users Success', users: User[]
    'Load Users Failure': props<{ error: any }>(),
  }
});
