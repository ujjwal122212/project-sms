import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainProfileComponent } from '../../main-profile-data/main-profile/main-profile.component';

@Component({
  selector: 'app-t-navbar',
  standalone: true,
  imports: [RouterLink,MainProfileComponent,RouterLinkActive],
  templateUrl: './t-navbar.component.html',
  styleUrl: './t-navbar.component.css'
})
export class TNavbarComponent {
  show=false;
 
  openProfile(){
  this.show=!this.show;
    }
}
