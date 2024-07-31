import { Component } from '@angular/core';
import { THomeworkPageComponent } from '../../../teacher/homework/t-homework-page/t-homework-page.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stud-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stud-menu.component.html',
  styleUrl: './stud-menu.component.css'
})
export class StudMenuComponent {

}
