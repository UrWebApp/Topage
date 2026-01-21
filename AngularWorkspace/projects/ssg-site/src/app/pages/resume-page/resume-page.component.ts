import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslatePipe } from 'lib/feature/translate/translate.pipe';
import { ParallaxDirective } from './parallax.directive';
import { TypewriterDirective } from './typewriter.directive';

@Component({
  selector: 'app-resume-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    ParallaxDirective,
    TypewriterDirective,
    NgOptimizedImage
  ],
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss']
})
export class ResumePageComponent {
  
  print(): void {
    window.print();
  }

}
