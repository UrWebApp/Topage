import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from 'lib/feature/theme/theme.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})


export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  // 創建一個 Observable<boolean> 來驅動模板中的 checked 狀態
  public isDarkMode$: Observable<boolean> = this.themeService.theme$.pipe(
    map((theme: any) => theme === Theme.Dark)
  );

  // 當 switch 改變時，呼叫 service 的方法
  onToggle(): void {
    this.themeService.toggleTheme();
  }
}
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
