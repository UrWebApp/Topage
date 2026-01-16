import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from 'lib/feature/translate/translate.pipe';
import { LocalizeRoutePipe } from '../../services/localize-route.pipe';
import { ThemeService, Theme } from 'lib/feature/theme/theme.service';
import { map } from 'rxjs';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    TranslatePipe, 
    LocalizeRoutePipe
  ],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  animations: [
    trigger('containerAnimation', [
      transition(':enter', [
        query('@itemAnimation', stagger(100, animate('0s'))),
      ])
    ]),
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ResumeComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);

  isDarkMode$ = this.themeService.theme$.pipe(
    map((theme: any) => theme === Theme.Dark)
  );

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  switchLang(lang: string) {
    this.router.navigate([lang, 'resume']);
  }

  printResume() {
    window.print();
  }
}
