import { Component } from '@angular/core';
import { GeneralNavbarComponent } from 'projects/ssg-site/src/app/components/general-navbar/general-navbar.component';
import { GeneralHeroSectionComponent } from 'projects/ssg-site/src/app/components/general-hero-section/general-hero-section.component';

@Component({
  selector: 'app-general-article-list',
  standalone: true,
  imports: [GeneralNavbarComponent, GeneralHeroSectionComponent],
  templateUrl: './general-article-list.component.html',
  styleUrl: './general-article-list.component.scss'
})
export class GeneralArticleListComponent {

}
