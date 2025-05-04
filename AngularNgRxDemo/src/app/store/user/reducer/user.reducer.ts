import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';
import { User } from '../user.store.service';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userFeature = createFeature({ // 自動產生 reducer + selectors：initialState、selectUsersuser、selectLoading、selectError 其餘的可以寫 selector 自訂
  name: 'user', // feature 的名稱，會當作 state 的 key（即 state.user）
  reducer: createReducer( // 傳入初始狀態 + 多個 action 處理器
    initialState,
    on(UserActions.loadUsers, state => ({ // 處理 [User] Load Users：啟動載入，設 loading 為 true
      ...state,
      loading: true
    })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({ // 處理 [User] Load Users Success：載入成功，更新 users，關掉 loading
      ...state,
      loading: false,
      users
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({ // 處理 [User] Load Users Failure：載入失敗，關掉 loading 並記錄 error
      ...state,
      loading: false,
      error
    })),
  )
});

// 如果要在 component 中使用 selector
// import { userFeature } from '../reducers/user.reducer';
// store.select(userFeature.selectUsers); // 自動產生的 selector
// store.select(userFeature.selectLoading);
// store.select(userFeature.selectError);
