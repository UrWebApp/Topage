import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from 'lib/feature/translate/translate.pipe';
import { LibraryModule } from 'lib/library.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LibraryModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // B2B 服務連結
  servicesLinks = [
    { label: 'FOOTER.LINKS.ARCH', url: '/services' },
    { label: 'FOOTER.LINKS.TRANSFORM', url: '/services' },
    { label: 'FOOTER.LINKS.WEB3', url: '/services' },
    { label: 'FOOTER.LINKS.CONSULT', url: '/services' }
  ];

  // B2C 內容連結
  exploreLinks = [
    { label: 'FOOTER.LINKS.TECH', url: '/tech' },
    { label: 'FOOTER.LINKS.CAREER', url: '/career' },
    { label: 'FOOTER.LINKS.LIFE', url: '/life' },
    { label: 'FOOTER.LINKS.ABOUT', url: '/about' }
  ];

  // 社交連結 (這裡可以用 icon，目前先用文字示意)
  socialLinks = [
    { label: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
    { label: 'Instagram', url: 'https://instagram.com/yourusername', icon: 'instagram' }
  ];
}
