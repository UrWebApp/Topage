import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from 'projects/lib/feature/translate/translate.pipe';
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
  imports: [CommonModule, NgOptimizedImage, TranslatePipe],
  templateUrl: './hero-service-card.component.html',
  styleUrl: './hero-service-card.component.scss'
})

export class HeroServiceCardComponent {
  services = [
    {
      title: 'SERVICE.HERO_CARD.CARD1.TITLE',
      enTitle: 'SERVICE.HERO_CARD.CARD1.EN_TITLE',
      desc: 'SERVICE.HERO_CARD.CARD1.DESC',
      tags: ['SERVICE.HERO_CARD.CARD1.TAG1', 'SERVICE.HERO_CARD.CARD1.TAG2'],
      // 使用簡約的線條 Icon，呼應背景的線稿風格
      iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      title: 'SERVICE.HERO_CARD.CARD2.TITLE',
      enTitle: 'SERVICE.HERO_CARD.CARD2.EN_TITLE',
      desc: 'SERVICE.HERO_CARD.CARD2.DESC',
      tags: ['SERVICE.HERO_CARD.CARD2.TAG1', 'SERVICE.HERO_CARD.CARD2.TAG2'],
      iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
    },
    {
      title: 'SERVICE.HERO_CARD.CARD3.TITLE',
      enTitle: 'SERVICE.HERO_CARD.CARD3.EN_TITLE',
      desc: 'SERVICE.HERO_CARD.CARD3.DESC',
      tags: ['SERVICE.HERO_CARD.CARD3.TAG1', 'SERVICE.HERO_CARD.CARD3.TAG2'],
      iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    }
  ];
}
