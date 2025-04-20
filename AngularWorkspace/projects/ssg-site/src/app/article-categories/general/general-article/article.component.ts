import { Component, inject , OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownData } from 'lib/feature/markdown-utils/markdown-utils';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { GeneralNavbarComponent } from 'projects/ssg-site/src/app/components/general-navbar/general-navbar.component';
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,GeneralNavbarComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private markdownData$ = this.activatedRoute.data.pipe(
    map((data: any) => data['article'] as MarkdownData),
  );
  protected markdownData = toSignal(this.markdownData$);
  constructor() {}
  ngOnInit(): void {

    console.log(this.markdownData()?.content);
  }

  getHeader(){

  }
}
