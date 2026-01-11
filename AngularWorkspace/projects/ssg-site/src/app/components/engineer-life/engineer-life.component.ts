import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DragScrollDirective } from '../../directives/drag-scroll.directive';

interface LifeEvent {
  id: number;
  category: 'Travel' | 'Investment' | 'Lifestyle' | 'Food';
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

@Component({
  selector: 'app-engineer-life',
  standalone: true,
  imports: [CommonModule,DragScrollDirective,NgOptimizedImage],
  templateUrl: './engineer-life.component.html',
  styleUrls: ['./engineer-life.component.scss']
})
export class EngineerLifeComponent {
  lifeEvents: LifeEvent[] = [
    {
      id: 1,
      category: 'Travel',
      title: '北海道自駕，雪地開車教學',
      description: '工作之餘也要記得休息，一同學雪地駕車。',
      image: '/assets/hokkado.jpg', // 記得換成你的照片
      date: '2024.12',
      link: '/life/kyoto-nomad'
    },
    {
      id: 2,
      category: 'Food',
      title: '萬物皆能舒肥',
      description: '工作認真，吃飯也要認真。',
      image: '/assets/steak.jpg',
      date: '2024.5',
      link: '/life/investment-philosophy'
    },
    {
      id: 3,
      category: 'Lifestyle',
      title: '我的工作檯配置分享',
      description: '打造極致生產力的 Desk Setup。',
      image: '/assets/desktopSetup.jpg',
      date: '2024.3',
      link: '/life/desk-setup'
    },
    {
      id: 4,
      category: 'Travel',
      title: '在大洋路與袋鼠邂逅',
      description: '在大自然的壯闊中，重新定義渺小。',
      image: '/assets/austrila.jpg',
      date: '2025.07',
      link: '/life/iceland-trip'
    },
    {
      id: 5,
      category: 'Travel',
      title: '阿蘇火山下的溫泉體驗',
      description: '休息是為了走更長的路。',
      image: '/assets/aso.jpg',
      date: '2024.02',
      link: '/life/crypto-experiment'
    }
  ];
}
