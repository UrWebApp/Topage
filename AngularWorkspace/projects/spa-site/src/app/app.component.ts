import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parseMarkdownMeta } from 'lib/feature/markdown-utils/markdown-utils';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spa-site';
  private httpClient = inject(HttpClient);
  test() {
    console.log('test')
    this.httpClient
      .get(`./content/testmd123.md`, { responseType: 'text' })
      .pipe(
        tap(()=>console.log('test2')),
        map((content) => parseMarkdownMeta(content)
      )).subscribe();
  }
}
