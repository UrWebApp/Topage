import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectInquiryComponent } from '../../components/project-inquiry/project-inquiry.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component'; // ✅ [新增] 引入 ThemeToggle
import { LanguageSwitcherComponent } from '../../components/language-switcher/language-switcher.component';
import { TranslatePipe } from 'lib/feature/translate/translate.pipe';

@Component({
  selector: 'app-system-service-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProjectInquiryComponent,
    FooterComponent,
    ThemeToggleComponent, // ✅ [新增] 加入 imports
    LanguageSwitcherComponent,
    TranslatePipe
  ],
  templateUrl: './system-service-page.component.html',
  styleUrls: ['./system-service-page.component.scss']
})
export class SystemServicePageComponent {
  isModalOpen = false;
  activeAdvice: string | null = null;

  showAdvice(type: 'diy' | 'ai') {
    if (type === 'diy') this.activeAdvice = 'diy';
    else if (type === 'ai') this.activeAdvice = 'ai';
  }

  openContactModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeContactModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }
}
