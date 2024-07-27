import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-fee-page',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './fee-page.component.html',
  styleUrl: './fee-page.component.css'
})
export class FeePageComponent {

}
