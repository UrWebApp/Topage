import { Component, inject, OnInit } from '@angular/core';
import { GeneralNavbarComponent } from 'projects/ssg-site/src/app/components/general-navbar/general-navbar.component';
import { GeneralHeroSectionComponent } from 'projects/ssg-site/src/app/components/general-hero-section/general-hero-section.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MarkdownData } from 'lib/feature/markdown-utils/markdown-utils';
import { toSignal } from '@angular/core/rxjs-interop';
import { Console } from 'console';

@Component({
  selector: 'app-general-article-list',
  standalone: true,
  imports: [GeneralNavbarComponent, GeneralHeroSectionComponent],
  templateUrl: './general-article-list.component.html',
  styleUrl: './general-article-list.component.scss'
})
export class GeneralArticleListComponent implements OnInit {
  ngOnInit(): void {
    this.routeText = this.activatedRoute.snapshot.data['routeTxt'];
    console.log('Route Text:', this.routeText);

  }
private activatedRoute = inject(ActivatedRoute);
routeText: any = null;

}
