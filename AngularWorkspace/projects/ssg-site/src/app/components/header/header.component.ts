import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'lib/feature/theme/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
 isDarkMode: boolean = false;
  isScrolled: boolean = false;
  private destroy$ = new Subject<void>();
  isMenuOpen: boolean = false; // For mobile menu toggle

  constructor(private themeService: ThemeService) { }
   ngOnInit(): void {
    this.themeService.darkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(mode => {
        this.isDarkMode = mode;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Listen for scroll events to add/remove 'scrolled' class
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50; // Add 'scrolled' class after 50px scroll
  }
}
