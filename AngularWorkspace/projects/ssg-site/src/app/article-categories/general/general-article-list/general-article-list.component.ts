import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../../components/general-navbar/general-navbar.component';

@Component({
  selector: 'app-general-article-list',
  standalone: true,
  imports: [GeneralNavbarComponent],
  templateUrl: './general-article-list.component.html',
  styleUrl: './general-article-list.component.scss'
})
export class GeneralArticleListComponent {

}
