import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { UserService } from '../user.store.service';
import { UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions); // 監聽 store 的 actions
  private userService = inject(UserService);

  loadUsers$ = createEffect(() => // 返回 actions observable
    this.actions$.pipe(
      ofType(UserActions.loadUsers), // 過濾出 loadUsers 這個 action 只針對這個 action
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users =>
            UserActions.loadUsersSuccess({ users }) // 成功：觸發成功 action
          ),
          catchError(error => of(
            UserActions.loadUsersFailure({ error }) // 失敗：觸發失敗 action
          ))
        )
      )
    )
  );
}


// Functional Effects

// export const loadUsersEffect = createEffect((actions$ = inject(Actions), svc = inject(UserService)) =>
//   actions$.pipe(
//     ofType(UserActions.loadUsers),
//     mergeMap(() => svc.getUsers().pipe(
//       map(users => UserActions.loadUsersSuccess({ users })),
//       catchError(err => of(UserActions.loadUsersFailure({ error: err })))
//     ))
//   )
// );
