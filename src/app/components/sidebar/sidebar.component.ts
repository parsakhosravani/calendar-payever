import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router) {}

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToCalendar() {
    this.router.navigate(['/calendar']);
  }
}
