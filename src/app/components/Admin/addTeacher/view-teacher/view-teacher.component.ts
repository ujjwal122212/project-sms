import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css'
})
export class ViewTeacherComponent {
 
}
