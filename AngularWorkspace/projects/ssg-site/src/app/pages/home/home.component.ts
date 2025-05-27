import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
