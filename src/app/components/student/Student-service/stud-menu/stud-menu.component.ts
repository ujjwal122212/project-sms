import { Component, inject } from '@angular/core';
import { THomeworkPageComponent } from '../../../teacher/homework/t-homework-page/t-homework-page.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-stud-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stud-menu.component.html',
  styleUrl: './stud-menu.component.css'
})
export class StudMenuComponent {
  route=inject(Router)
 gotoId(){
  this.route.navigateByUrl('/studentlayout/Open-SerComponent/Id-CardComponent')
 }
}
