import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-t-menubar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './t-menubar.component.html',
  styleUrl: './t-menubar.component.css'
})
export class TMenubarComponent {
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
}
