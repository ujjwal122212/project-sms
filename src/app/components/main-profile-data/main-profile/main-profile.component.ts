import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-profile',
  standalone: true,
  imports: [],
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.css'
})
export class MainProfileComponent {
route=inject(Router);
logout(){
  this.route.navigateByUrl('/Login-page');
}
}
