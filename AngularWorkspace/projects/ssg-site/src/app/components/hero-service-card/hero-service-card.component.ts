import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ServiceCard {
  title: string;
  subtitle: string;
  description: string;
  iconPath: string; // 我們直接用 SVG path 字串，不依賴額外套件
  highlight: string; // 用來標示重點技術
}
@Component({
  selector: 'app-hero-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-service-card.component.html',
  styleUrl: './hero-service-card.component.scss'
})

export class HeroServiceCardComponent {
services = [
    {
      title: '企業數位轉型',
      enTitle: 'Digital Transformation',
      desc: '告別 Excel 的混亂。為您量身打造企業內部系統，將繁瑣流程自動化。',
      tags: ['客製化系統', '流程優化'],
      // 使用簡約的線條 Icon，呼應背景的線稿風格
      iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      title: 'Web 應用開發',
      enTitle: 'Custom Web Development',
      desc: '構建高安全性、高併發的企業級應用。確保系統穩定與未來的擴充性。',
      tags: ['全端開發', 'SEO 調優'],
      iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
    },
    {
      title: '技術顧問與教學',
      enTitle: 'Consulting & Mentoring',
      desc: '從非本科到資深的實戰經驗傳承。提供最接地氣的轉職諮詢與技術指導。',
      tags: ['職涯輔導', '架構設計'],
      iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    }
  ];
}
