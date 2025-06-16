import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, Inject, Renderer2 } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { HeroImageComponent } from "../../components/hero-image/hero-image.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroImageComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    private isDarkMode = false;
      constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(this.document.body, 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark');
    }
  }
}
