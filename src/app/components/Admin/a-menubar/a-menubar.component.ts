import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-a-menubar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './a-menubar.component.html',
  styleUrl: './a-menubar.component.css'
})
export class AMenubarComponent {
  is_text_display_none: boolean = false;
  width: string = '';

  menu_collapsed() {
    this.is_text_display_none = true;
    this.width = "toggle";
  }
  menu_expanded() {
    this.is_text_display_none = false;
    this.width = '';
  }
  collapse(){
    this.is_text_display_none = false;
    this.width = '';
  }
  menu_dark(){
    const ex=document.querySelector('.menu') as HTMLDivElement;
    ex.classList.toggle('dark');
  }


}
