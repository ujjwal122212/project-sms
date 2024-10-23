import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainProfileComponent } from "../../main-profile-data/main-profile/main-profile.component";
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MainProfileComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  show=false;
 
openProfile(){
this.show=!this.show;
  }
}
