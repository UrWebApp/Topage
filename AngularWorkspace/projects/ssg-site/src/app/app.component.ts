import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SampleModule } from "../../../lib/user-interface/sample/sample.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SampleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ssg-site';
}
