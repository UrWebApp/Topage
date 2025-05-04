import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectLoading } from './store/user/selectors/user.selectors';
import { UserActions } from './store/user/actions/user.actions';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NgFor, NgIf, AsyncPipe],
})
export class AppComponent {
  private store = inject(Store);

  // Signal + Observable
  readonly usersSignal = this.store.selectSignal(selectAllUsers);
  readonly loading$ = this.store.select(selectLoading);

  ngOnInit() {

    this.store.dispatch(UserActions.loadUsers()); // loadusers action 觸發對應的 Effect
    // 關聯方式是透過 actions 內的定義名稱
    // ofType(UserActions.loadUsers) 為 Effect 觸發後的執行函式
  }
}
