import { CommonModule, ViewportScroller } from "@angular/common";
import { TranslatePipe } from 'lib/feature/translate/translate.pipe';
import { Component, HostListener, OnInit } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslatePipe
  ],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  scrollY = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollY = window.scrollY;
  }

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    // Scroll to top on init
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  downloadResume() {
    // This can be implemented later to download a PDF version
    window.print();
  }
}
