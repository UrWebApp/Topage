import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-general-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './general-navbar.component.html',
  styleUrl: './general-navbar.component.scss'
})
export class GeneralNavbarComponent {

}
