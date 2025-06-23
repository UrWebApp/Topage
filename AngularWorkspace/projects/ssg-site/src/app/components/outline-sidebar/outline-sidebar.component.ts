import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-outline-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outline-sidebar.component.html',
  styleUrl: './outline-sidebar.component.scss'
})
export class OutlineSidebarComponent {
  @Input() links: OutlineLink[] = [];

}
export interface OutlineLink {
  level: number;
  text: string;
  id: string;
}

