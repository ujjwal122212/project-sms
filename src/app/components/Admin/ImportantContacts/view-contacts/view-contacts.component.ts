import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-view-contacts',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './view-contacts.component.html',
  styleUrl: './view-contacts.component.css'
})
export class ViewContactsComponent {




}
