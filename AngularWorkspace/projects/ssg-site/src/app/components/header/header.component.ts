import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { LocalizeRoutePipe } from '../../services/localize-route.pipe';
import { LibraryModule } from 'lib/library.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggleComponent,
    LanguageSwitcherComponent,
    LibraryModule,
    LocalizeRoutePipe // ✅ 加入 imports
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
