import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-a-menubar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './a-menubar.component.html',
  styleUrl: './a-menubar.component.css'
})
export class AMenubarComponent {

}
