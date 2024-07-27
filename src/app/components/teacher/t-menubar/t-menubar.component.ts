import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-t-menubar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './t-menubar.component.html',
  styleUrl: './t-menubar.component.css'
})
export class TMenubarComponent {

}
