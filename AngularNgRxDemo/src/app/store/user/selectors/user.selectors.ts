import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';

// 建立一個 "feature selector"：抓出 state 中 'user' 這個 slice
// 假設你的全域狀態長這樣：{ user: { users: [], loading: false, ... } }
// 這邊的 'user' 字串要跟 createFeature 裡定義的 name: 'user' 一樣
export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector( // 建立 selector：從 user feature state 中選出 users 陣列
  selectUserState,
  state => state.users
);
export const selectLoading = createSelector(selectUserState, state => state.loading);
