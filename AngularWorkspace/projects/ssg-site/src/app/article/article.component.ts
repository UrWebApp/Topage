import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownData } from 'lib/feature/markdown-utils/markdown-utils';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <p *ngFor="let data of markdownData()?.meta">{{data}}</p>
    <br>
    <div [innerHTML]="markdownData()?.content"></div>
  `,
  styles: ``,
})
export class ArticleComponent {
  private activatedRoute = inject(ActivatedRoute);
  private markdownData$ = this.activatedRoute.data.pipe(
    map((data: any) => data['article'] as MarkdownData),
  );
  protected markdownData = toSignal(this.markdownData$);
  constructor() {}
}
