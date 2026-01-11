import { CommonModule, DOCUMENT, NgOptimizedImage } from "@angular/common";
import { Component, Inject, Renderer2 } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { HeroImageComponent } from "../../components/hero-image/hero-image.component";
import { HeroServiceCardComponent } from "../../components/hero-service-card/hero-service-card.component";
import { EngineerLifeComponent } from "../../components/engineer-life/engineer-life.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroImageComponent,
    HeroServiceCardComponent,
    EngineerLifeComponent,
    FooterComponent,
    NgOptimizedImage,
    RouterLink
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
