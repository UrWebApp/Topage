import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import { Firestore } from '@angular/fire/firestore';
// import { Auth, authState, signInWithEmailAndPassword, user } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
  ],
  template: `

    <router-outlet />

    <br>
    <br>
    <br>
    <a routerLink="/">home</a>
    <br>
    <br>
    <a routerLink="/development/LetYouRoughlyUnderstandWhatHttpRequest">/Development/LetYouRoughlyUnderstandWhatHttpRequest</a>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ssg-site';
  // firestore: Firestore = inject(Firestore);
  // private auth: Auth = inject(Auth);
  // user$ = user(this.auth);
  // email = 'your_email@example.com';
  // password = 'your_password';
  // user = {};

  constructor() {
    // this.user$.subscribe((res: any) => this.user = res);
  }

  async login(): Promise<void> {
    // await signInWithEmailAndPassword(this.auth, this.email, this.password);
    // this.user$ = authState(this.auth);
  }
}
