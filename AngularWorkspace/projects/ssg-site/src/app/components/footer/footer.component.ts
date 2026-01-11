import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibraryModule } from 'lib/library.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LibraryModule],
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // B2B 服務連結
  servicesLinks = [
    { label: '系統架構設計', url: '/services' },
    { label: '企業數位轉型', url: '/services' },
    { label: 'Web3 解決方案', url: '/services' },
    { label: '技術顧問諮詢', url: '/services' }
  ];

  // B2C 內容連結
  exploreLinks = [
    { label: '技術筆記 (Tech)', url: '/tech' },
    { label: '職涯轉型 (Career)', url: '/career' },
    { label: '生活風格 (Life)', url: '/life' },
    { label: '關於虎虎', url: '/about' }
  ];

  // 社交連結 (這裡可以用 icon，目前先用文字示意)
  socialLinks = [
    { label: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
    { label: 'Instagram', url: 'https://instagram.com/yourusername', icon: 'instagram' }
  ];
}
